const express = require('express');

const bodyParser = require('body-parser');

const rutaFallos = require('./routes/fallo.router');

const errores = require('./controllers/error.controller');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json())  // Para uso del request body -- Remember to use express.json() middleware to parse request body else you'll get an error 

/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
*/
app.use('/fallos', rutaFallos);

app.use(errores.get404);

app.use(errores.get500);

app.listen(ports, () => console.log(`Escuchando en el puerto ${ports}`));
