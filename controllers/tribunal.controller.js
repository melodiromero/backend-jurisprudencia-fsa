const Tribunal = require('../models/tribunal.model');
4
exports.getTribunales = async (req, res, next) => {  
  // req.query is mostly used for searching,sorting, filtering, pagination, e.t.c
  
  console.log('datos', req.query);
  
  let id_tribunal      =  req.query.id_tribunal;
  
  try{
    
    const [leerTribunales] = await Tribunal.get(id_tribunal);
    console.log('mensaje', leerTribunales);

    if (leerTribunales[0].length === 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };

    res.status(200).json(leerTribunales[0]);
   
  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

