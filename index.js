const express           = require('express');

const jwt               = require('jsonwebtoken');

const rutaFallos        = require('./routes/v1.0/fallo.router');

const rutaSumarios      = require('./routes/v1.0/sumario.router');

const rutaTribunales    = require('./routes/v1.0/tribunal.router');

const rutaReporte       = require('./routes/v1.0/reporte.router');

const rutaLogin         = require('./routes/v1.0/login.router');

const errores           = require('./controllers/error.controller');

const cors              = require('cors');

const app               = express();

const ports             = process.env.PORT || 3016;

var corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions));

//app.use(bodyParser.urlencoded({ extended: false }));

// parse various different custom JSON types as JSON
//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(express.json());


app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // Para uso del request body -- Remember to use express.json() middleware to parse request body else you'll get an error 
// Configurar cabeceras y cors

//Middleware en Express
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



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

app.use('/api/v1.0/login', rutaLogin);

app.use('/api/v1.0/jurisprudencia/fallos',  rutaFallos);

app.use('/api/v1.0/jurisprudencia/sumarios',  rutaSumarios);

app.use('/api/v1.0/tribunales',  rutaTribunales);

app.use('/api/v1.0/reporte',  rutaReporte);

app.use(errores.get404);

app.use(errores.get500);

app.listen(ports, () => console.log(`Escuchando en el puerto ${ports}`));



