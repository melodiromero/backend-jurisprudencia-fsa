const db = require('../util/database');

module.exports = class Sumario {
  constructor(id_sumario, numeroFallo, tribunal, fechaFallo, caratula, firmantes, palabraLibre) {
    this.id_sumario   = id_sumario;
    this.numeroFallo  = numeroFallo;
    this.tribunal     = tribunal;
    this.fechaFallo   = fechaFallo;
    this.caratula     = caratula;
    this.firmantes    = firmantes;
    this.descriptores = descriptores;
    this.palabraLibre = palabraLibre;
  }

  static get(id_sumario, numeroFallo, tribunal, fechaFallo, caratula, firmantes, descriptores, palabraLibre) { 
    
    return db.query('CALL c1jurisprudencia.SP_LeerSumarios(?,?,?,?,?,?,?)',[id_sumario, numeroFallo, tribunal, fechaFallo, caratula, firmantes, descriptores, palabraLibre]);
  
  }

};
