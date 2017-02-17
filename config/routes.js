var express = require('express');
var router = express.Router();

// --------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('public/index.html');
})

/* Upload to GUESS server */
router.post('/upload', function (req, res, next) {
	console.log(req.data);
	res.json();
});


/* Redirect all other routes to the home page */
// router.get('/*', function(req, res, next) {
//   res.status(404).json({error: "Not Found"})
// });

module.exports = router;
