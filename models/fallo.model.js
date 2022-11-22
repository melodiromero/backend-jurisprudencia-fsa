const db = require('../util/database');

module.exports = class Fallo {
  constructor(id_fallo, numeroFallo, tribunal) {
    this.id_fallo     = id_fallo;
    this.numeroFallo  = numeroFallo;
    this.tribunal     = tribunal;
    this.tipoFallo    = tipoFallo;
    this.fechaFallo   = fechaFallo;
    this.caratula     = caratula;
    this.sumarios_relacionados = sumarios_relacionados;
    this.descriptores = descriptores;

  }
/*
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
*/
  static get(id_fallo, numeroFallo, tribunal, tipoFallo, fechaFallo, caratula, descriptores ) {
    

    let falloBuscado = " SELECT f.Id_Fallos AS id_fallo, f.NroFallo AS numeroFallo, f.Organismo	AS id_tribunal, " ;
    falloBuscado     += " t.descripcion AS tribunal, IF(f.Tipo =1, 'AUTO INTERLOCUTORIO', 'SENTENCIA') AS tipoFallo,";
    falloBuscado     += " f.FechaFallo as fechaFallo,  f.Partes AS caratula, f.Fallo, f.Fecha as fechaAlta, ";
    falloBuscado     += " GROUP_CONCAT( j.ID_SUMARIO SEPARATOR ',') AS sumarios_relacionados, ";
    falloBuscado     += " GROUP_CONCAT( j.TEMA SEPARATOR ', ') AS descriptores ";
    falloBuscado     += " FROM fallos AS f INNER JOIN tribunales AS t ON f.Organismo = t.idtribunal ";
    falloBuscado     += " LEFT JOIN jurisprudencia AS j ON f.NroFallo = j.NROFALLO WHERE t.Activo = 1 " ;

    if (id_fallo) {
      falloBuscado     += "  AND f.Id_Fallos = " + id_fallo ;
    }

    if (numeroFallo) {
      falloBuscado     += "  AND f.NroFallo = " + numeroFallo ;
    }

    if (tribunal) {
      falloBuscado     += "  AND f.Organismo = " + tribunal ;
    }

    if (tipoFallo == 1) {
      falloBuscado     += "  AND f.Tipo = '1' ";
    }

    if (!tipoFallo == 1) {
      falloBuscado     += "  AND f.Tipo != 1 ";
    }


    falloBuscado     += " GROUP BY f.`Id_Fallos`  ORDER BY  1 DESC ";
    console.log('cadeena ', falloBuscado);

    return db.execute(falloBuscado);

    //return db.execute('CALL SP_LeerFallos2(?,?,?,?,?)',[id_fallo, numeroFallo, tribunal, tipoFallo, fechaFallo, caratula, descriptores]);
  }

};
