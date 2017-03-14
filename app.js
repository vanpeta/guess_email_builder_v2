var express = require('express');
var path = require('path');
var routes = require('./config/routes');
var bodyParser = require('body-parser')
require('dotenv').load();

var app = express();
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use(bodyParser.json({limit: 1024*1024*20}));
app.use(bodyParser.urlencoded({extended: true, limit: 1024*1024*20}));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
