var express = require('express');
var router = express.Router();
var Client = require('ftp');
var ftpClient = require('ftp-client');
var config = {
	host: process.env.host,
	port: process.env.port,
	user: process.env.user,
	password: process.env.password,
}
var options = {
	logging: 'basic'
}


// --------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('public/index.html');
})



/* Upload to GUESS server */
router.post('/upload', function (req, res, next) {
	var client = new ftpClient(config, options);
	client.connect(function (e) {
		console.log(e)
	})
	res.json({res: "working"});
});


/* Redirect all other routes to the home page */
// router.get('/*', function(req, res, next) {
//   res.status(404).json({error: "Not Found"})
// });

module.exports = router;
