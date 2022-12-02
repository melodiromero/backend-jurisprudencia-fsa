const express = require('express');

//const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const unless    = require('express-unless'); // Para determinar que rutas vale el Middleware

const rutaFallos = require('./routes/fallo.router');

const rutaSumarios = require('./routes/sumario.router');

const rutaTribunales = require('./routes/tribunal.router');

const errores = require('./controllers/error.controller');

const app = express();

const ports = process.env.PORT || 3000;
/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
*/

app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // Para uso del request body -- Remember to use express.json() middleware to parse request body else you'll get an error 

/*

const auth = (req, res, next) =>{  // Middlewade de autenticacion
    try{
        //Inicio del reconocimiento del token
        let token = req.headers['authorization'];
    
        if (!token){
            throw new Error("No estas logueado");
        }
    
        token = token.replace('Bearer ','');
    
        jwt.verify(token, 'Secret',(err, user)=>{
            /*if (err){
                res.status(401).send({error: "Token inválido"});
            }else{
                console.log("usuario valido", user);
                res.status(202).send({message:"usuario valido" });
    
            }*//*
            if (err){
                console.log('token invalido');
                res.status(401).send({error: "Token inválido"});
            }  
        });

        next(); //Pasa el control a la funcion que se llamo en la peticion.-

    }catch(e){
        res.status(403).send({message: e.message});
    }
}

auth.unless = unless;

app.use(auth.unless({ //Se especifica para que rutas no funciona la autenticacion
    path: [
        {url: '/login', method: ['POST']}
    ]
}));*/

/*
// Se realiza un login estatico:
app.use('/login',(req,res) => {

    try{
        if( !req.body.usuario || !req.body.clave ){
            res.status(401).send({error: "Falta usuario y clave"});
            return;
        }

        if (req.body.usuario == "ADMIN" && req.body.clave == "1234"){
            const  tokenData = {
                alias: 'usuarioConsulta'
            }

            const token = jwt.sign(tokenData, 'Secret',{
                expiresIn: 60*60*24 //expira en 24hs.
            });

            res.send({token});
        }else{
            res.status(401).send({error:"Usuario y/o clave incorrectas"});
        }
   }catch(e){
        console.error(e.message);
       res.status(413).send({"mensaje": e.message + " error inesperado"});
    }

});
*/
app.use('/fallos', rutaFallos);

app.use('/sumarios', rutaSumarios);

app.use('/tribunales',rutaTribunales);

app.use(errores.get404);

app.use(errores.get500);

app.listen(ports, () => console.log(`Escuchando en el puerto ${ports}`));



