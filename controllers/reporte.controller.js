const Reporte = require('../models/reporte.model');
// Obtiene una estadistica de cuantos fallos y sumarios existen.-

exports.getReporte = async (req, res, next) => {  
  // req.query is mostly used for searching,sorting, filtering, pagination, e.t.c
  
  try{
    const [leerEstadistica] = await Reporte.get();
    console.log('mensaje', leerEstadistica);

    if (leerEstadistica[0].length === 0) {
      throw new Error ("No se hallaron resultados.");
    };

    res.status(200).json(leerEstadistica[0]);
   
  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

exports.getReportePorAnio = async (req, res, next) => {  
  // req.query is mostly used for searching,sorting, filtering, pagination, e.t.c
  
  try{
    const [leerEstadistica] = await Reporte.getByAnio();
    console.log('mensaje', leerEstadistica);

    if (leerEstadistica[0].length === 0) {
      throw new Error ("No se hallaron resultados.");
    };

    res.status(200).json(leerEstadistica[0]);
   
  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

exports.getReportePorTribunal = async (req, res, next) => {  
  // req.query is mostly used for searching,sorting, filtering, pagination, e.t.c
  
  try{
    const [leerEstadistica] = await Reporte.getByTribunal();
    console.log('mensaje', leerEstadistica);

    if (leerEstadistica[0].length === 0) {
      throw new Error ("No se hallaron resultados.");
    };

    res.status(200).json(leerEstadistica[0]);
   
  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};
