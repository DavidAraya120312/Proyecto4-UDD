const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Esto permite que tu frontend se comunique con este backend
app.use(bodyParser.json()); // Para poder leer JSON del cuerpo de las peticiones

// Aquí importarás tus rutas de API
const reservationRoutes = require('./api/reservation');

app.use('/api/reservation', reservationRoutes);

// Definir un endpoint básico para comprobar que todo funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
