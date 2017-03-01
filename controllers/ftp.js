require('dotenv').load();
var Client = require('ftp');
var base64Decode = require('base64-stream').decode;
var sslRootCAs = require('ssl-root-cas/latest');



module.exports = {
	getInfo: getInfo,
	postImage: postImage
}

var ftpConfig = {
	host: process.env.host,
	port: process.env.port,
	secure: true,
	user: process.env.user,
	password: process.env.password,
}

function getInfo (req, res, next) {
	var image = req.body.image;
	console.log('image=', image);	
	var imageBuffer = Buffer.from(image, 'base64');
	console.log(imageBuffer);
	var brand = req.body.brand;
	console.log('brand=', brand);
	var year = req.body.year;
	console.log('year=', year);
	var month = req.body.month;
	console.log('month=', month);
	var day = req.body.day;
	console.log('day=', day);
	var imageName = req.body.imageName;
	console.log(req.body.imageName);
	var path = '/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day;
	var c = new Client();
	//next line needs to be removed for security and find out how to do it without it. You will the next error { [Error: unable to verify the first certificate] code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' } 
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
	c.connect(ftpConfig);
	c.on('ready', function () {
		c.cwd(path, function (err, currentDir) {
			if (err) {
				console.log('inside 1st cwd error')
				if (err.code == 550) {
					console.log('inside 1st cwd error 505')
					c.mkdir(path, true, function (err) {
						if (err) {
							console.log('inside mkdir error')
							return res.json(err);
						}
						c.put(imageBuffer, path+'/'+imageName, function (err) {
							if (err) {
								console.log('error putting after mkdir')
								throw err
							}
							c.cwd(path, function (err, currentDir) {
								if (err) {
									console.log('inside 2nd cwd error')
									return res.json(err);
								}
								c.list(function (err, list) {
									if (err) {
										console.log('inside list after mkdir and cwd to it')
										return res.json(err);
									}
									return res.json({res: list});
								})
							})
						})
					})
				}
				else {
					return res.json(err);
				}
			}
			else {
				c.put(imageBuffer, path+'/'+imageName, function (err) {
					if (err) {
						console.log('error putting')
						throw err
					}
					c.list(function (err, list) {
					if (err) {
						console.log('inside list without mkdir')
						return res.json(err);
					}
					console.log(list);
					res.json({res: list})
					c.end();
					});
				})
			}
		});
	});
}


function postImage (req, res, next) {
	res.json({res: "working"})
}
