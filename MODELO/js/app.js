var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {createConnectionPool} = require('../../config/database');
const cors = require("cors");
const session = require('express-session');
const apiRoutes = require("./routes/apis"); // Asegúrate de tener tu archivo de rutas en `routes/api.js`


var app = express();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usuarios');
var postsRouter = require('./routes/publicaciones');
var commentRouter = require('./routes/comments');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors({
  origin: "http://127.0.0.1:5500", // Dominio del frontend
  credentials: true,              // Permitir envío de cookies entre frontend y backend
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", apiRoutes); // Prefijo "/api" para nuestras rutas

app.use(session({
  secret: 'Admin12_',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/publis', postsRouter);
app.use('/comment', commentRouter);

createConnectionPool();

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
