const db = require('../util/database');

module.exports = class Reporte {
 
  static get() { 
    
    return db.query('CALL c1jurisprudencia.SP_LeerEstadistica()');
  
  }

};
