require('dotenv').load();
var Client = require('ftp');
var sslRootCAs = require('ssl-root-cas/latest')

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
	var brand = req.query.brand;
	console.log('brand=', brand);
	var year = req.query.year;
	console.log('year=', year);
	var month = req.query.month;
	console.log('month=', month);
	var day = req.query.day;
	console.log('day=', day);
	var c = new Client();
	//next line needs to be removed for security and find out how to do it without it. You will the next error { [Error: unable to verify the first certificate] code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' } 
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
	c.connect(ftpConfig);
	c.on('ready', function () {
		c.cwd('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day, function (err, currentDir) {
			if (err) {
				console.log('inside 1st cwd error')
				if (err.code == 550) {
					console.log('inside 1st cwd error 505')
					c.mkdir('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day, true, function (err) {
						if (err) {
							console.log('inside mkdir error')
							return res.json(err);
						}
						c.cwd('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day, function (err, currentDir) {
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
				}
				else 
					return res.json(err);
			}
			else c.list(function (err, list) {
				if (err) {
					console.log('inside list without mkdir')
					return res.json(err);
				}
				console.log(list);
				res.json({res: list})
				c.end();
			});
			// if (err.code !== 550) {
			// 	console.log('no 550 error')
			// 	throw err;
			// }
			// else if (err.code == 550) {
			// 	return (new Promise (function (resolve, reject) {
			// 		c.mkdir('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day, true, function (err) {
			// 			console.log('inside 550')
			// 			if (err) throw err;					
			// 			resolve (c.cwd('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day, function (err, currentDir) {
			// 				console.log('inside 550 entrando')
			// 				if (err) {
			// 					console.log('error entrando');
			// 					throw err;
			// 				}
			// 			}))
			// 		});
			// 	})
			// 	.then(
			// 		c.list(function (err, list) {
			// 			if (err) throw err;
			// 			console.log(list);
			// 			c.end();
			// 			res.json({res: list});
			// 		})
			// 	));
			// }
			// else c.list(function (err, list) {
			// 	if (err) throw err;
			// 	console.log(list);
			// 	res.json({res: list})
			// 	c.end();
			// });
		});
	});
}

function postImage (req, res, next) {
	res.json({res: "working"})
}
