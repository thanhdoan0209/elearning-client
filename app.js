const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const expressSession = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const classesRouter = require('./routes/classes');

const bodyParser = require('body-parser');
const db = require('./models/index');

// import routers
const app = express();

// body parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({ secret: 'docata' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.isAuthenticated = true;
    res.locals.name = req.user.firstName + req.user.lastName;
    res.locals.username = req.user.username;
  } else {
    res.locals.isAuthenticated = false;
  }
  next();
})

app.all('*', function (req, res, next) {
  if (req.isAuthenticated() || req.url === '/login') {
    next();
  } else {
    res.redirect('/login')
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classes', classesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
