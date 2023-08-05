const express = require('express');
const { connectToDb } = require('../lib/connectDb');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
      console.log('Dentro del manejador POST');
      
      const { nombres, correo, telefono, mensaje } = req.body;
      console.log('Datos del cuerpo:', nombres, correo, telefono, mensaje);
      
      const db = await connectToDb();
      console.log('Conectado a la base de datos');
      
      const collection = db.collection('reservations');
      console.log('Obtenida la colección');
      
      await collection.insertOne({ nombres, correo, telefono, mensaje });
      console.log('Datos insertados en la base de datos');
      
      res.status(200).json({ message: "Reserva guardada con éxito" }); // <-- Cambia esta línea
    } catch (error) {
      console.error('Error en el manejador POST:', error);
      res.status(500).send('Error al guardar la reserva: ' + error.message);
    }
  });
  

router.get('/', async (req, res) => {
    try {
        const db = await connectToDb();
        const reservations = await db.collection('reservations').find({}).toArray();
        res.json(reservations);
    } catch (error) {
        console.error('Error en el manejador GET:', error);
        res.status(500).send('Error al obtener las reservas: ' + error.message);
    }
});


router.delete('/', async (req, res) => {
    try {
        const db = await connectToDb();
        await db.collection('reservations').deleteMany({});
        res.status(200).send('Todas las reservas eliminadas');
    } catch (error) {
        console.error('Error en el manejador DELETE:', error);
        res.status(500).send('Error al eliminar las reservas: ' + error.message);
    }
});


module.exports = router;
