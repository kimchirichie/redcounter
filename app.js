var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// setup session for security verification
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'some secret string',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null }
}))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// before security so that login screen also has style
app.use(express.static(path.join(__dirname, 'public')));

// security verification to keep creeps away
app.use(function(req, res, next){
  if(req.session.tries === undefined){
    req.session.tries = 1;
  }
  if(req.body && req.body.password){
    req.session.password = req.body.password;
  }

  if (req.session.password === undefined) {
    console.log(req.session.tries)
    if (req.session.tries && req.session.tries > 3){
      res.render('fail');
    } else {
      res.render('login');
    }
    return;
  }

  if(req.session.password !== 'wowitshuge'){
    delete req.session.password;
    req.session.tries++;
    res.render('fail');
    return
  }

  next();
});

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
