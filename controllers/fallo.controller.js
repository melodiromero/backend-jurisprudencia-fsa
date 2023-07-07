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
    
    const [leerFallo] = await Fallos.getById(id, null, null);
        
    if (leerFallo[0].length === 0) 
    {
      throw new Error ("Error en parámetro de consulta.");
    };

    const [leerSumarios] = await Sumarios.getByFallo(leerFallo[0][0].id_interno, leerFallo[0][0].id_tribunal, resume);

    let array_sumarios, sumarios = [];

    (leerSumarios[0].length > 0)
    {
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
   
  console.log('datos', req.query);
  
  let jurisdiccion      =  req.query.jurisdiccion;
  let provincia         =  req.query.provincia;
  let publicacion_desde =  req.query.publicacion_desde;
  let publicacion_hasta =  req.query.publicacion_hasta;
  let fecha_umod        =  req.query.fecha_umod;
  let texto             =  req.query.texto;
  let descriptores      =  req.query.descriptores;
  let tribunal          =  req.query.tribunal;
  let limit             =  req.query.limit;
  let offset            =  req.query.offset;
  
  try{
    /* Algunas validaciones si es que ingresa el parámetro */
    
    if (publicacion_desde && publicacion_desde.length != 10) {
      throw new Error('Faltan datos. El parámetro de la fecha de fallo no está correcta. La forma correcta es: dd/mm/aaaa.');
    }
    
    if (publicacion_hasta && publicacion_hasta.length != 10) {
      throw new Error('Faltan datos. El parámetro de la fecha de fallo no está correcta. La forma correcta es: dd/mm/aaaa.');
    }

    if (fecha_umod && fecha_umod.length != 10) {
      throw new Error('Faltan datos. El parámetro de la fecha de fallo no está correcta. La forma correcta es: dd/mm/aaaa.');
    }

    if (descriptores && descriptores.length <= 3) {
      throw new Error('Faltan datos. Para buscar por descriptores debe ingresar una frase con más de 3 caracteres.');
    }

    if (tribunal && tribunal.length <= 3) {
      throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    if (texto && texto.length <= 3) {
      throw new Error('Faltan datos. Para buscar por voces debe ingresar términos con más de 3 caracteres.');
    }

    const [leerFallos] = await Fallos.get(jurisdiccion, provincia, publicacion_desde, publicacion_hasta, fecha_umod, texto, descriptores, tribunal, limit, offset);
    
    console.log('mensaje', leerFallos);

    if (leerFallos[0].length === 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };

    let fallos, sumarios = [];
    let array_fallos =  eerFallos[0];
    (array_fallos.length > 0)
    {
   
      for (let clave in array_fallos){

        fallos.push({
                      "metadata": 
                      {
                        "uuid":             array_fallos[clave].id_fallo,
                        "document-type" :   "jurisprudencia"
                      },
                      
                      "content":  
                      {
                        "id_fallo":          array_fallos[clave].id_fallo,
                        "tribunal":          array_fallos[clave].tribunal, 
                        "tipo_tribunal":     null,
                        "instancia":         null,
                        "fecha":             array_fallos[clave].fecha, 
                        'jurisdiccion': 
                                                {
                                                  "tipo":       "LOCAL",
                                                  "pais":       "Argentina",
                                                  "provincia":  "FORMOSA",
                                                  "localidad":  array_fallos[0].localidad,
                                                  "id_pais": 11
                                                },
                        "caratula":             {
                                                  "actor": null,
                                                  "demandado": null,
                                                  "sobre": array_fallos[0].caratula, 
                                                 },
                        "sumarios_relacionados": sumarios,
                        "descriptores": [],
                        "fecha_umod":           array_fallos[0].fecha_umod
                 
                        
                      }
                   });
    
    res.status(200).json(
      {
        "document": 
        { 
           "SearchResultList": 
           {
              "results"     : "",
              "query"       : "",
              "offset"      : "",
              "pageSize"    : ""        
           },
           "DocumentResultList": 
           {
              "fallos"      : fallos
          }
        }
      });
   



  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};
