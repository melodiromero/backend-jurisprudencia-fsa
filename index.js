const express           = require('express');

const jwt               = require('jsonwebtoken');

const rutaFallos        = require('./routes/fallo.router');

const rutaSumarios      = require('./routes/sumario.router');

const rutaTribunales    = require('./routes/tribunal.router');

const rutaLogin         = require('./routes/login.router');

const errores           = require('./controllers/error.controller');

const app               = express();

const ports             = process.env.PORT || 3000;

//app.use(bodyParser.urlencoded({ extended: false }));

// parse various different custom JSON types as JSON
//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(express.json());


app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // Para uso del request body -- Remember to use express.json() middleware to parse request body else you'll get an error 

const auth = (req, res, next) =>{  // Middlewade de autenticacion

    try{
        //Inicio del reconocimiento del token
        
        let token = req.headers.authorization;
        if (!token){
            throw new Error("No estas logueado");
        }
    
        token = token.split(" ")[1];
       
        jwt.verify(token, 'Secret Password',(err, user)=>{
           console.log('errro',err,'user',user);
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

app.use('/login', rutaLogin);

app.use('/fallos', auth, rutaFallos);

app.use('/sumarios', auth, rutaSumarios);

app.use('/tribunales', auth, rutaTribunales);

app.use(errores.get404);

app.use(errores.get500);

app.listen(ports, () => console.log(`Escuchando en el puerto ${ports}`));



