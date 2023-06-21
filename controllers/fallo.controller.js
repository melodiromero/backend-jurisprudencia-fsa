const Fallos = require('../models/fallo.model');

const Sumarios = require('../models/sumario.model');
// Obtiene todos los fallos.

// Obtiene un fallo por id  - segun especificacion SAIJ
exports.getFalloById = async (req, res, next) => {  

  let id      =  req.query.id;
  let resume  =  req.query.resume;
  try{
    
    if(!id) { 
      throw new Error('Parámetro inválido.');
    }
    
    const [leerFallo] = await Fallos.getById(id);
    
    
    if (leerFallo[0].length === 0) {
      throw new Error ("Error en parámetro de consulta.");
    };

    const [leerSumarios] = await Sumarios.getSumariosByFallo(leerFallo[0][0].id_interno, leerFallo[0][0].id_tribunal, resume);

    let array_sumarios, sumarios = [];

    console.log('sum', leerSumarios[0]);

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

    let regFallo = {
                  "tipo_documento":       leerFallo[0][0].tipo_documento,
                  "subtipo_documento":    leerFallo[0][0].subtipo_documento,
                  "tipo_fallo":           leerFallo[0][0].tipoFallo,
                  "id_fallo":             leerFallo[0][0].id_fallo,
                  "id_interno":           leerFallo[0][0].id_interno,
                  "tribunal":             leerFallo[0][0].tribunal, 
                  "tipo_tribunal":        null,
                  "instancia":            null,
                  "fecha":                leerFallo[0][0].fecha, 
                  'jurisdiccion': 
                                          {
                                            "tipo": "LOCAL",
                                            "pais": "Argentina",
                                            "provincia": "FORMOSA",
                                            "localidad":  leerFallo[0][0].localidad,
                                            "id_pais": 11
                                          },
                  "caratula":             {
                                            "actor": null,
                                            "demandado": null,
                                            "sobre": leerFallo[0][0].caratula, 
                                          },
                  "hechos":               null,
                  "fuente":               null,
                  "urlApi":               null,
                  "descriptores":         null,
                  "texto_fallo":          leerFallo[0][0].texto, 
                  "magistrados":          [],
                  "sumarios_relacionados": sumarios,
                  "referencias-normativas": [],
                  "fecha_umod":           leerFallo[0][0].fecha_umod
                  }


    res.status(200).json(
      {
        "document": 
        { 
           "metadata": 
           {
              "uuid": regFallo.id_fallo,
              "document-type" : "jurisprudencia"
           },
            
           "content": regFallo

        }
      });
   
  }catch(e){
    console.error(e.message);
    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};



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
  let palabraLibre  =  req.query.palabraLibre;
  
  try{
    
    if(!id_fallo && !numeroFallo && !tribunal && !tipoFallo && !fechaFallo && !caratula && !descriptores && !palabraLibre) { // Validación de datos - el usuario debe ingresar al menos un parámetro de búsqueda. }
      throw new Error('Faltan datos. Por favor, debe ingresar almenos un parámetro de búsqueda . ');
    } //redirección al catch
    
    if (fechaFallo && fechaFallo.length != 10) {
      throw new Error('Faltan datos. El parámetro de la fecha de fallo no está correcta. La forma correcta es: dd/mm/aaaa.');
    }

    if (caratula && caratula.length <= 3) {
      throw new Error('Faltan datos. Para buscar por carátula debe ingresar una frase con más de 3 caracteres.');
    }

    if (descriptores && descriptores.length <= 3) {
      throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    if (palabraLibre && palabraLibre.length <= 3) {
      throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    const [leerFallos] = await Fallos.get(id_fallo, numeroFallo, tribunal, tipoFallo, fechaFallo, caratula, descriptores, palabraLibre);
    console.log('mensaje', leerFallos);

    if (leerFallos[0].length === 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };

    res.status(200).json(leerFallos[0]);
   
  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

