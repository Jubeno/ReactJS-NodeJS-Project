const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connectToDatabase } = require('./library/connection');
const { USER_SESSION, TIMELINE } = require('./library/constants');

// MongoDB Connect
connectToDatabase();



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const timelineRouter = require('./routes/timeline');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', indexRouter);
app.use(USER_SESSION, authRouter);
app.use(TIMELINE, timelineRouter)

// app.post('/api/usersession/signup', function (req, res, next) {
//   console.log('%c  req:', 'color: #0e93e0;background: #aaefe5;', req.body);
//   res.json("Greeting Trung!!")
// });

// catch 404 and forward to error handler
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
