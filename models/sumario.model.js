const db = require('../util/database');

module.exports = class Sumario {
  constructor(id_sumario, numeroFallo, id_tribunal, tribunal, fecha, caratula, firmantes, descriptores,  palabraLibre) {
    this.id_sumario   = id_sumario;
    this.numeroFallo  = numeroFallo;
    this.id_tribunal  = id_tribunal;
    this.tribunal     = tribunal;
    this.fecha        = fecha;
    this.caratula     = caratula;
    this.firmantes    = firmantes;
    this.descriptores = descriptores;
    this.palabraLibre = palabraLibre;
    this.resume       = resume;
  }
  // getByFallo recupera los sumarios por nro y tribunal
  static getByFallo(numeroFallo, id_tribunal, resume) { 
    
    return db.query('CALL c1jurisprudencia.SP_api_LeerSumarioPorFallo(?,?, ?)',[numeroFallo, id_tribunal, resume]);
  
  }
   // getById recupera el sumario por el id
  static  getById(id_sumario) { 
    
    return db.query('CALL c1jurisprudencia.SP_api_LeerSumariosPorId(?)',[id_sumario]);
  
  }

  static get(publicacion_desde, publicacion_hasta, umod_desde, umod_hasta, fecha_umod, texto, descriptores, tribunal, offset, limit,total) { 
    
    return db.query('CALL c1jurisprudencia.SP_api_LeerSumarios(?,?,?,?,?,?,?,?,?,?,?)',[publicacion_desde, publicacion_hasta, umod_desde, umod_hasta, fecha_umod, texto, descriptores, tribunal, offset, limit,total]);
  
  }

};
