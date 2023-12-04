const db = require('../util/database');

module.exports = class Fallo {
  constructor(id_fallo, numeroFallo, tribunal, tipoFallo, fechaFallo, caratula, sumarios_relacionados, descriptores, palabraLibre) {
    this.id_fallo     = id_fallo;
    this.numeroFallo  = numeroFallo;
    this.tribunal     = tribunal;
    this.tipoFallo    = tipoFallo;
    this.fechaFallo   = fechaFallo;
    this.caratula     = caratula;
    this.sumarios_relacionados = sumarios_relacionados;
    this.descriptores = descriptores;
    this.palabraLibre = palabraLibre;
  }

  // La funcion getById que llama al SP SP_api_LeerFalloPorId retorna los datos de un fallo especifico de acuerdo por su id o bien, nro y añio. 
  // Cuando se busca por id se lo llama para la busqueda de fallos por id y cuando se lo invoca por nro y tribunal se lo llama de la busqueda de sumarios y se busca los fallos relacionados.
  // Para la busqueda de los fallos asociados a un sumario se pasa nro  de fallo y tribunal porque en la base de datos no esta relacionado por id, solo tenemos nro de fallo y tribunal.
  static getById(id_fallo, numeroFallo, idtribunal) { 
    return db.query('CALL c1jurisprudencia.SP_api_LeerFalloPorId(?, ?, ?)',[id_fallo, numeroFallo, idtribunal]);
  }
  
  // La funcion get que llama al SP SP_api_LeerFallos() retorna un listado de fallos de acuerdo a los parametros de busqueda ingresados, caso contrario por defecto retorna los primeros 50 registros.
  static get(publicacion_desde, publicacion_hasta, umod_desde, umod_hasta, fecha_umod, texto, tribunal, offset, limit, total) { 
    
    return db.query('CALL c1jurisprudencia.SP_api_LeerFallos(?,?,?,?,?,?,?,?,?,?)',[publicacion_desde, publicacion_hasta, umod_desde, umod_hasta, fecha_umod, texto, tribunal, offset, limit, total]);
  
  }

};
