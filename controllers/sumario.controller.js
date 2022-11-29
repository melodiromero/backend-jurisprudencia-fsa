const Sumarios = require('../models/sumario.model');
// Obtiene todos los fallos.

// Obtiene los fallos segun los parametros de busqueda.
exports.getSumarios = async (req, res, next) => {  
  // req.query is mostly used for searching,sorting, filtering, pagination, e.t.c
  
  let id_sumario    =  req.query.id_sumario;
  let numeroFallo   =  req.query.numeroFallo;
  let tribunal      =  req.query.tribunal;
  let fecha         =  req.query.fecha;
  let caratula      =  req.query.caratula;
  let firmantes     =  req.query.firmantes;
  let descriptores  =  req.query.descriptores;
  let palabraLibre  =  req.query.palabraLibre;

  try{
    
    if(!id_sumario && !numeroFallo && !tribunal && !fecha && !caratula && !firmantes && !descriptores && !palabraLibre) { // Validación de datos - el usuario debe ingresar al menos un parámetro de búsqueda. }
      throw new Error('Faltan datos. Por favor, debe ingresar almenos un parámetro de búsqueda . ');
    } //redirección al catch
    
    if (caratula && caratula.length <= 3) {
      throw new Error('Faltan datos. Para buscar por carátula debe ingresar una frase con más de 3 caracteres.');
    }

    if (firmantes && firmantes.length <= 3) {
      throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    if (descriptores && descriptores.length <= 3) {
        throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    if (palabraLibre && palabraLibre.length <= 3) {
        throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    const [leerSumarios] = await Sumarios.get(id_sumario, numeroFallo, tribunal, fecha, caratula, firmantes, descriptores, palabraLibre);
    console.log('mensaje', leerSumarios);

    if (leerSumarios[0].length === 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };

    res.status(200).json(leerSumarios[0]);
   
  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

