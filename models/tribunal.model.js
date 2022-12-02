const db = require('../util/database');

module.exports = class Tribunal {
  constructor(id_tribunal, descripcion) {
    this.id_tribunal  = id_tribunal;
    this.descripcion  = descripcion;
  }
  
  static get(id_tribunal) { 
  
    return db.query('CALL c1jurisprudencia.SP_LeerTribunales(?)',[id_tribunal]);
  
  }

};
