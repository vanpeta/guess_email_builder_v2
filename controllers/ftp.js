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
		c.cwd('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+'month'+'/'+'day', function (err, currentDir) {
			if (err) {
				if (err.code == 550) {
					c.mkdir('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day, true, function (err) {
						if (err) {
							console.log('error creando');
							throw err;
						}
						console.log('mkdir no err');
						c.cwd('/43877/GuessUS/'+brand+'/Emails/'+year+'/'+month+'/'+day, function (err, currentDir) {
							if (err) {
								console.log('error entrando');
								throw err;
							}
							c.list(function (err, list) {
								if (err) throw err;
								console.log(list);
								res.json({res: list})
								c.end();
							});
						});
					});
				}
			}
			c.list(function (err, list) {
				if (err) throw err;
				console.log(list);
				res.json({res: list})
				c.end();
			});
		});
	});
}

function postImage (req, res, next) {
	res.json({res: "working"})
}
