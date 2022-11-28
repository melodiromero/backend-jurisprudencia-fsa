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
  
  static get(id_fallo, numeroFallo, tribunal, tipoFallo, fechaFallo, caratula, descriptores, palabraLibre) { 
    
    return db.query('CALL c1jurisprudencia.SP_LeerFallos(?,?,?,?,?,?,?)',[id_fallo, numeroFallo, tribunal, tipoFallo, fechaFallo, caratula, descriptores, palabraLibre]);
  
  }

};
