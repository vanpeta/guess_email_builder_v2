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
	var c = new Client();
	//next line needs to be removed for security and find out how to do it without it. You will the next error { [Error: unable to verify the first certificate] code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' } 
	process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
	c.connect(ftpConfig);
	c.on('ready', function () {
		console.log('ready');
		c.list(function (err, list) {
			if (err) throw err;
			console.log(list);
			c.end();
		})
	})
	res.json({res: "working"})
}

function postImage (req, res, next) {
	res.json({res: "working"})
}
