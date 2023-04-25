const express           = require('express');

const jwt               = require('jsonwebtoken');

const rutaFallos        = require('./routes/fallo.router');

const rutaSumarios      = require('./routes/sumario.router');

const rutaTribunales    = require('./routes/tribunal.router');

const rutaReporte       = require('./routes/reporte.router');

const rutaLogin         = require('./routes/login.router');

const errores           = require('./controllers/error.controller');

const cors              = require('cors');

const app               = express();

const ports             = process.env.PORT || 3016;

var corsOptions = {
    origin: 'localhost',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors()); 

//app.use(bodyParser.urlencoded({ extended: false }));

// parse various different custom JSON types as JSON
//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(express.json());


//app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // Para uso del request body -- Remember to use express.json() middleware to parse request body else you'll get an error 
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


/*
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
*/
app.use('/login', rutaLogin);

app.use('/fallos',  rutaFallos);

app.use('/sumarios',  rutaSumarios);

app.use('/tribunales',  rutaTribunales);

app.use('/reporte',  rutaReporte);

app.use(errores.get404);

app.use(errores.get500);

app.listen(ports, () => console.log(`Escuchando en el puerto ${ports}`));



