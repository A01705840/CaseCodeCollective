const express = require('express');
const router = express.Router();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');
app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));


// Configura Express para servir archivos estáticos desde el directorio 'public'
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//Body parser 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());


const rutasUsuarios = require('./routes/usuarios.routes');
app.use('/Usuario', rutasUsuarios);

const rutasLeads = require('./routes/leads.routes');
app.use('/Lead', rutasLeads);

const rutasSignup = require('./routes/usuarios.routes');
app.use('/Usuario', rutasSignup);

app.use((request, response, next) => {
  response.status(404);
  response.render(path.join(__dirname, 'views', '404.ejs')); //Manda la respuesta
});

module.exports = router;


app.listen(3000);
