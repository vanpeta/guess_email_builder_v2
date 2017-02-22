var express = require('express');
var router = express.Router();
var ftpController = require('../controllers/ftp');
// --------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendfile('public/index.html');
})

/*Connect to ftp */
router.get('/connect', ftpController.getInfo);
/* Upload to GUESS server */
router.post('/upload', ftpController.postImage);

/* Redirect all other routes to the home page */
// router.get('/*', function(req, res, next) {
//   res.status(404).json({error: "Not Found"})
// });

module.exports = router;
