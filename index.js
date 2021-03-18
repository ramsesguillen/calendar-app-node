const express = require('express');
const app     = express();
const cors    = require('cors')
const {
    dbConnection
} = require('./database/config');
require('dotenv').config();





// Base de datos
dbConnection();

// Habilitar cors
app.use(cors());

// Habilitar carpeta publica
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));




app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})





// mongodb+srv://mern_user:ZUezcVqTVIVhUirq@cluster0.djlvz.mongodb.net

// dbU: mern_user
// pass: ZUezcVqTVIVhUirq
// ip: 189.148.124.201/32

