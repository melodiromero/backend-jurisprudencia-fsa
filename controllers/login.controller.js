const jwt = require('jsonwebtoken');

exports.getLogin = async (req, res, next) => {  
  // req.query is mostly used for searching,sorting, filtering, pagination, e.t.c

  var usuario = req.body.usuario;
  var clave   = req.body.clave;

  try{
    /*
    const [logueo] = await Login.findOne(usuario, clave );
    console.log('mensaje', leerTribunales);

    if (logueo[0].length === 0) {
      throw new Error ("No se hallaron resultados, verifique sus parámetros de busqueda.");
    };

    res.status(200).json(logueo[0]);
   */

    if( !(usuario === 'f4ll05' && clave === 'jur15prud3nci4')){
      res.status(401).send({
        error: 'usuario o contraseña inválidos'
      })
      return
    }
  
    var tokenData = {
      usuario: usuario
      // ANY DATA
    }
  
    var token = jwt.sign(tokenData, 'Secret Password', {
       expiresIn: 60 * 60 * 24 // expires in 24 hours
    })
  

    res.status(200).send({
      "message": "Autenticación correcta",
      "token" : token
    })

    
  }catch(e){
    console.error(e.message);
    // BAD_REQUEST (400)

    res.status(400).send({'mensaje': e.message});
    next(e);
  }  

};

exports.getLogout = async (req, res) => {  
  
  try{
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
       if (logout) {
          res.status(200).send({message : 'Has sido desconectado' });
       } else {
          res.status(401).send({message:'Error'});
       }
    });
  
  }catch(e){
        res.status(403).send({message: e.message});
    }


};
