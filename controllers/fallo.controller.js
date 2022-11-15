const Fallos = require('../models/fallo.model');
// Obtiene todos los fallos.
exports.getAllFallos = async (req, res, next) => {
  try {
    const [todosFallos] = await Fallos.fetchAll();
    res.status(200).json(todosFallos);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Obtiene los fallos segun los parametros de busqueda.
exports.getFallos = async (req, res, next) => {

  console.log('Peticion: ', req.body);
  try {
    const leerFallos = await Fallos.get(req.body.numeroFallo, req.body.tribunal);
    res.status(200).json(leerFallos);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

