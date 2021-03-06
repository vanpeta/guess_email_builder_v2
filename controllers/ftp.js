require('dotenv').load();
var Client = require('ftp');
var sslRootCAs = require('ssl-root-cas/latest');

module.exports = {
	getFiles: getFiles,
	postFiles: postFiles
}

var ftpConfig = {
	host: process.env.host,
	port: process.env.port,
	secure: true,
	user: process.env.user,
	password: process.env.password,
}

function postFiles (req, res, next) {
	var image = req.body.image;
	console.log('image=', image);	
	var imageBuffer = Buffer.from(image, 'base64');
	console.log(imageBuffer);
	var brand = req.body.location.brand.replace(/\s+/g, '');
	console.log('brand=', brand);
	var year = req.body.location.year;
	console.log('year=', year);
	var month = req.body.location.month;
	console.log('month=', month);
	var day = req.body.location.day;
	console.log('day=', day);
	var imageName = req.body.imageName.replace(/\s+/g, '_');
	console.log(req.body.imageName);
	var path = '/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day;
	var url = 'http://content.guess.com/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day+'/'+imageName;
	// var image = req.body.image;
	// console.log('image=', image);	
	// var imageBuffer = Buffer.from(image, 'base64');
	// console.log(imageBuffer);
	// var brand = req.body.brand;
	// console.log('brand=', brand);
	// var year = req.body.year;
	// console.log('year=', year);
	// var month = req.body.month;
	// console.log('month=', month);
	// var day = req.body.day;
	// console.log('day=', day);
	// var imageName = req.body.imageName;
	// console.log(req.body.imageName);
	// var path = '/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day;
	// var url = 'http://content.guess.com/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day+'/'+imageName;
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
							return res.json({err: err, message: 'inside mkdir error'});
						}
						c.put(imageBuffer, path+'/'+imageName, function (err) {
							if (err) {
								console.log('error putting after mkdir')
								throw err
							}
							c.cwd(path, function (err, currentDir) {
								if (err) {
									return res.json({err: err, message: 'inside 2nd cwd error'});
								}
								c.list(function (err, list) {
									if (err) {
										return res.json({err: err, message: 'inside list after mkdir and cwd to it'});
									}
									return res.json({filesInFolder: list, url: url});
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
						return res.json({err: err, message: 'inside list without mkdir'});
					}
					res.json({filesInFolder: list, url: url})
					c.end();
					});
				})
			}
		});
	});
	// res.json({res: "working"})
}


function getFiles (req, res, next) {
	// var image = req.body.image;
	// console.log('image=', image);	
	// var imageBuffer = Buffer.from(image, 'base64');
	// console.log(imageBuffer);
	// var brand = req.body.brand;
	// console.log('brand=', brand);
	// var year = req.body.year;
	// console.log('year=', year);
	// var month = req.body.month;
	// console.log('month=', month);
	// var day = req.body.day;
	// console.log('day=', day);
	// var imageName = req.body.imageName;
	// console.log(req.body.imageName);
	// var path = '/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day;
	// var url = 'http://content.guess.com/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day+'/'+imageName;
	var c = new Client();
	//next line needs to be removed for security and find out how to do it without it. You will the next error { [Error: unable to verify the first certificate] code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' } 
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
	c.connect(ftpConfig);
	c.on('ready', function () {
		c.cwd('/43877/GuessUS/', function (err, currentDir) {
			if (err) {
				return res.json({
					err: err,
					message: 'something went wrong changing to home directory'
				})
			}
			c.list(function (err, list) {
				if (err) {
					console.log('inside first list')
					return res.json({
						err: err,
						message: 'inside first list'
					});
				}
				res.json({filesInFolder: list})
				c.end();
			})
		})
	})
};






