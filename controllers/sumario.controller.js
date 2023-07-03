const Sumarios = require('../models/sumario.model');

// Obtiene un fallo por id  - segun especificacion SAIJ
exports.getSumarioById = async (req, res, next) => {  

  let id      =  req.query.id;

  try{
    
    if(!id) { 
      throw new Error('Parámetro inválido.');
    }
    
    const [leerSumario] = await Sumarios.getById(id);
    
    if (leerSumario[0].length === 0) {
      throw new Error ("Error en parámetro de consulta.");
    };
/*
    const [leerSumarios] = await Sumarios.getSumariosByFallo(leerFallo[0][0].id_interno, leerFallo[0][0].id_tribunal, resume);

    let array_sumarios, sumarios = [];

    if (leerSumarios[0].length > 0) {
      // Guardamos los datos del sumario en un array de sumarios.-
      array_sumarios = leerSumarios[0]
      for (let clave in array_sumarios){

        sumarios.push({
                      "uid_sumario":      array_sumarios[clave].id_sumario,
                      "id_sumario":       array_sumarios[clave].id_sumario,
                      "titulo_sumario":   array_sumarios[clave].titulo_sumario,
                      "texto_sumario":    array_sumarios[clave].texto_sumario,
                      "magistrados":      [
                                            {
                                              "nombre":  array_sumarios[clave].firmantes,
                                              "voto"  :  null
                                            }
                                          ]
                      })
      }
    
    };
*/

    let regSumario = {
                  "id_sumario":             leerSumario[0][0].id_sumario,
                  "titulo":                 leerSumario[0][0].titulo,
                  "texto":                  leerSumario[0][0].texto,
                  "id_fallo":               leerSumario[0][0].fecha,
                  "id_interno":             leerSumario[0][0].id_interno,
                  "id-infojus":             null,

                  "referencias-normativas": [],
                  
                  "descriptores":           leerSumario[0][0].tema,




                  "fallos-relacionados":    []
                }

    res.status(200).json(
      {
        "document": 
        { 
           "metadata": 
           {
              "uuid": regSumario.id_fallo,
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

