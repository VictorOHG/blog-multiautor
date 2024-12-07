var createError = require('http-errors');
var express = require('express');
var path = require('path');
const {createConnectionPool} = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');

// Crear la app de Express
const app = express();

// Middleware para permitir solicitudes CORS (opcional)
app.use(cors());

//Indices de rutas
var indexRouter = require('./routes/index');
var postsRouter = require('./routes/publicaciones');

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

//Rutas
app.use('/', indexRouter);
app.use('/publis', postsRouter)

// Inicializar la conexión a la base de datos
createConnectionPool();


module.exports = app;
