const Fallos = require('../models/fallo.model');
// Obtiene todos los fallos.
/*
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
*/

// Obtiene los fallos segun los parametros de busqueda.
exports.getFallos = async (req, res, next) => {  
  // req.query is mostly used for searching,sorting, filtering, pagination, e.t.c
  
  console.log('datos', req.query);
  
  let id_fallo      =  req.query.id_fallo;
  let numeroFallo   =  req.query.numeroFallo;
  let tribunal      =  req.query.tribunal;
  let tipoFallo     =  req.query.tipoFallo;
  let fechaFallo    =  req.query.fechaFallo;
  let caratula      =  req.query.caratula;
  let descriptores  =  req.query.descriptores;

  try{
    
    if(!id_fallo && !numeroFallo && !tribunal && !tipoFallo && !fechaFallo && !caratula && !descriptores) { // Validación de datos - el usuario debe ingresar al menos un parámetro de búsqueda. }
      throw new Error('Faltan datos. Por favor, debe ingresar almenos un parámetro de búsqueda . ');
    } //redirección al catch
    
    if (caratula && caratula.length <= 3) {
      throw new Error('Faltan datos. Para buscar por carátula debe ingresar una frase con más de 3 caracteres.');
    }

    if (descriptores && descriptores.length <= 3) {
      throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    const [leerFallos] = await Fallos.get(id_fallo, numeroFallo, tribunal, tipoFallo, fechaFallo, caratula, descriptores);
    console.log('mensaje', leerFallos);

    if (leerFallos.length == 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };

    res.status(200).json(leerFallos);

  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)
    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

