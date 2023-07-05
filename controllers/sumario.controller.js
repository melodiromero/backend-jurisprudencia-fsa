const Sumarios  = require('../models/sumario.model');

const Fallos    = require('../models/fallo.model');
// Obtiene un fallo por id  - segun especificacion SAIJ
exports.getSumarioById = async (req, res, next) => {  

  let id      =  req.query.id;

  try{
    
    if(!id){ 
      throw new Error('Parámetro inválido.');
    }
    
    const [leerSumario] = await Sumarios.getById(id);

    if (leerSumario[0].length === 0) {
      throw new Error ("Error en parámetro de consulta.");
    };

    const leerFallos = await Fallos.getById(null, leerSumario[0][0].numeroFallo, leerSumario[0][0].id_tribunal);

    const array_fallos = leerFallos[0]; // Suponiendo que los resultados estén en el índice 0

    if (array_fallos[0] == '[]') {
      throw new Error("Error: no hay fallo para ese sumario, inconsistencia de datos.");
    }

    let fallos = [];

    if (array_fallos[0].length > 0) {
     
      for (let clave in array_fallos[0]){
        fallos.push({
                        "metadata": 
                        {
                          "uuid": array_fallos[0][clave].id_fallo,
                          "document-type" : "jurisprudencia"
                        },
                        
                        "content": 
                        {
                          "id_fallo":             array_fallos[0][clave].id_fallo,
                          "tipo_fallo":           array_fallos[0][clave].tipoFallo,
                          "tribunal":             array_fallos[0][clave].tribunal, 
                          "fecha":                array_fallos[0][clave].fecha, 
                          'jurisdiccion': 
                                                  {
                                                    "tipo": "LOCAL",
                                                    "pais": "Argentina",
                                                    "provincia": "FORMOSA",
                                                    "localidad":  array_fallos[0][clave].localidad,
                                                    "id_pais": 11
                                                  },
                          "caratula":             {
                                                    "actor": null,
                                                    "demandado": null,
                                                    "sobre": array_fallos[0][clave].caratula, 
                                                  },
                          "urlApi":               null,
                          "fecha_umod":           array_fallos[0][clave].fecha_umod
                        }
            
                    })
    
      }
    }

    let regSumario = {
                  "id_sumario":             leerSumario[0][0].id_sumario,
                  "titulo":                 leerSumario[0][0].titulo,
                  "texto":                  leerSumario[0][0].texto,
                  "fecha":                  leerSumario[0][0].fecha,
                  "id_interno":             leerSumario[0][0].id_interno,
                  "id-infojus":             null,
                  "referencias-normativas": [],
                  "descriptores":           leerSumario[0][0].tema,
                  "fallos-relacionados":    fallos
                    }

    res.status(200).json(
      {
        "document": 
        { 
           "metadata": 
           {
              "uuid": regSumario.id_sumario,
              "document-type" : "jurisprudencia"
           },
            
           "content": regSumario

        }
      });
   
  }catch(e){
    console.error(e.message);
    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};











// Obtiene los sumarios segun el numero de fallo y el id de tribunal.
exports.getSumarios = async (req, res, next) => {  
  //  Obtiene los sumarios segun el numero de fallo y el id de tribunal.
  

  let numeroFallo   =  req.query.numeroFallo;
  let tribunal      =  req.query.tribunal;
  

  try{
    
    if(!numeroFallo && !tribunal) { // Validación de datos - el usuario debe ingresar al menos un parámetro de búsqueda. }
      throw new Error('Faltan datos. Por favor, debe ingresar almenos un parámetro de búsqueda . ');
    } //redirección al catch
    
    const [leerSumarios] = await Sumarios.get(id_sumario, numeroFallo, tribunal, fecha, caratula, firmantes, descriptores, palabraLibre);
    console.log('mensaje', leerSumarios);

    if (leerSumarios[0].length === 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };

    res.status(200).json(leerSumarios[0]);
   
  }catch(e){
    console.error(e.message);

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};


// Obtiene los sumarios segun los parametros de busqueda.
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

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

