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
              "document-type" : "sumario"
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


// Obtiene los sumarios segun los parametros de busqueda.
exports.getSumarios = async (req, res, next) => {  

  console.log('datos', req.query);
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
    
    if (publicacion_desde && publicacion_desde.length < 10) {
      throw new Error('Faltan datos. El parámetro de la fecha de fallo no está correcta. La forma correcta es: YYYY-MM-DD.');
    }
    
    if (publicacion_hasta && publicacion_hasta.length < 10 ) {
      throw new Error('Faltan datos. El parámetro de la fecha de fallo no está correcta. La forma correcta es: YYYY-MM-DD.');
    }

    if (fecha_umod && fecha_umod.length <10) {
      throw new Error('Faltan datos. El parámetro de la fecha de fallo no está correcta. La forma correcta es: YYYY-MM-DD.');
    }

    if (descriptores && descriptores.length <= 3) {
      throw new Error('Faltan datos. Para buscar por descriptores debe ingresar una frase con más de 3 caracteres.');
    }

    if (tribunal && tribunal.length <= 3) {
      throw new Error('Faltan datos. Para buscar por tribunal debe ingresar términos con más de 3 caracteres.');
    }

    if (texto && texto.length <= 3) {
      throw new Error('Faltan datos. Para buscar por texto debe ingresar términos con más de 3 caracteres.');
    }

    // Se lee primero el total de registros de la consulta
    const [total] = await Sumarios.get(publicacion_desde, publicacion_hasta, fecha_umod, texto, descriptores, tribunal, offset, limit, true);
    
    const [leerSumarios] = await Sumarios.get(publicacion_desde, publicacion_hasta, fecha_umod, texto, descriptores, tribunal, offset, limit, false);
    console.log('mensaje', leerSumarios);

    if (leerSumarios[0].length === 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };
    
    if (leerSumarios[0] == '[]') {
      throw new Error("Error: no hay sumarios.");
    }

    let sumarios = [];

    if (leerSumarios[0].length > 0) {
     
      for (let clave in leerSumarios[0]){
        sumarios.push({
                        "metadata": 
                        {
                          "uuid": leerSumarios[0][clave].id_fallo,
                          "document-type" : "sumario"
                        },
                        
                        "content": 
                          {
                            "id_sumario":             leerSumarios[0][0].id_sumario,
                            'jurisdiccion': 
                                                      {
                                                        "tipo": "LOCAL",
                                                        "pais": "Argentina",
                                                        "provincia": "FORMOSA",
                                                        "localidad":  leerSumarios[0][0].localidad,
                                                        "id_pais": 11
                                                      },
                            "fecha":                  leerSumarios[0][0].fecha,
                            "id_interno":             leerSumarios[0][0].id_interno,
                            "titulo":                 leerSumarios[0][0].titulo,
                            "descriptores":           leerSumarios[0][0].tema,
                            "fecha_umod":             leerSumarios[0][0].fecha
                        }
            
                    })
    
      }
    }


    res.status(200).json(
      {
        "document": 
        { 
           "SearchResultList": 
           {
              "results"     : total[0][0].total,
              "query"       : "<string>",
              "offset"      : offset,
              "pageSize"    : sumarios.length        
           },
           "DocumentResultList": 
           {
              "sumarios"      : sumarios
          }
        }
    });
      
   
  }catch(e){
    console.error(e.message);

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};
