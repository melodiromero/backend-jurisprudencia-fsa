const db = require('../util/database');

module.exports = class Fallo {
  constructor(id_fallo, numeroFallo, tribunal) {
    this.id_fallo     = id_fallo;
    this.numeroFallo  = numeroFallo;
    this.tribunal     = tribunal;
    this.tipoFallo    = tipoFallo;
    this.fecha        = fecha;
    this.caratula     = caratula;
    this.sumarios_relacionados = sumarios_relacionados;
  }

  static fetchAll() {
    //return db.execute('CALL SP_LeerFallos()');
    let todosFallos = " SELECT f.Id_Fallos AS id_fallo, f.NroFallo AS numeroFallo, " ;
    todosFallos     += " t.descripcion AS tribunal, IF(f.Tipo =1, 'AUTO INTERLOCUTORIO', 'SENTENCIA') AS tipoFallo,";
    todosFallos     += " DATE_FORMAT(f.Fecha,'%d/%m/%Y') AS fecha,  f.Partes AS caratula, f.Fallo, f.Fecha as fechaAlta, ";
    todosFallos     += " GROUP_CONCAT( j.ID_SUMARIO SEPARATOR ',') AS sumarios_relacionados, ";
    todosFallos     += " GROUP_CONCAT( j.TEMA SEPARATOR ', ') AS descriptores ";
    todosFallos     += " FROM fallos AS f INNER JOIN tribunales AS t ON f.Organismo = t.idtribunal ";
    todosFallos     += " INNER JOIN jurisprudencia AS j ON f.NroFallo = j.NROFALLO WHERE t.Activo = 1 GROUP BY f.Id_Fallos" ;

    return db.execute(todosFallos);

  }

  static get(numeroFallo, tribunal) {
    // coloque lso parametros numeroFallo y tribunal como para buscar en un principio, luego agregare los demas.}

    let falloBuscado = " SELECT f.Id_Fallos AS id_fallo, f.NroFallo AS numeroFallo, " ;
    falloBuscado     += " t.descripcion AS tribunal, IF(f.Tipo =1, 'AUTO INTERLOCUTORIO', 'SENTENCIA') AS tipoFallo,";
    falloBuscado     += " DATE_FORMAT(f.Fecha,'%d/%m/%Y') AS fecha,  f.Partes AS caratula, f.Fallo, f.Fecha as fechaAlta, ";
    falloBuscado     += " GROUP_CONCAT( j.ID_SUMARIO SEPARATOR ',') AS sumarios_relacionados, ";
    falloBuscado     += " GROUP_CONCAT( j.TEMA SEPARATOR ', ') AS descriptores ";
    falloBuscado     += " FROM fallos AS f INNER JOIN tribunales AS t ON f.Organismo = t.idtribunal ";
    falloBuscado     += " INNER JOIN jurisprudencia AS j ON f.NroFallo = j.NROFALLO WHERE f.NroFallo = ? AND  f.Organismo = ? AND t.Activo = 1 GROUP BY f.Id_Fallos" ;

    return db.execute(falloBuscado, [numeroFallo, tribunal]);
    //return db.execute('CALL SP_LeerFallos2(NULL,?)',[numeroFallo]);
  }

};
