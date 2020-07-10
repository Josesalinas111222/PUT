require('dotenv').config();

//API-REST
const cors = require('cors');
const express = require("express");
const path = require('path');
const app = express();
const sqlConn = require('./Conexion/conexion') //funcion de configuracion de conexion sql
const tasksRouters = require('./routes/tasks'); //rutas de consultas a la bd
const Task = require('./Task/SampleTask');
const multer = require('multer');

//Token
const jwt = require('./ServicesAPI/jwt'); //file playload
const Config = require('./Controles/config'); //file Token-Secret
const middlewares = require('./Middleware/Authenticated') //file de authen

//Settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3006);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routers
app.use('/api', tasksRouters);
app.use('/', tasksRouters);

//Static file
app.use(express.static(path.join(__dirname, 'dist')));

//Star Port Server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});