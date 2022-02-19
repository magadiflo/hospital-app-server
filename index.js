require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Rutas
//Cuando una petición vaya por esta ruta /api/usuarios/, será interceptada por el middleware de routes/usuarios.js
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});