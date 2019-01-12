var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require('firebase');
var bodyParser = require('body-parser');
var firebase = require('./firebase');
var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.json())

app.use('/home', indexRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
  console.log(user);
} else {
  // No user is signed in.
  console.log("no user signed in");
}

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
