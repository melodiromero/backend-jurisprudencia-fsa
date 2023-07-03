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


  static getSumariosByFallo(numeroFallo, id_tribunal, resume) { 
    
    return db.query('CALL c1jurisprudencia.SP_api_LeerSumarioPorFallo(?,?, ?)',[numeroFallo, id_tribunal, resume]);
  
  }

  
  static getById(id_sumario) { 
    
    return db.query('CALL c1jurisprudencia.SP_api_LeerSumariosPorId(?)',[id_sumario]);
  
  }

  static getById(id_sumario, numeroFallo, tribunal, fecha, caratula, firmantes, descriptores, palabraLibre) { 
    
    return db.query('CALL c1jurisprudencia.SP_LeerSumarios(?,?,?,?,?,?,?,?)',[id_sumario, numeroFallo, tribunal, fecha, caratula, firmantes, descriptores, palabraLibre]);
  
  }

};
