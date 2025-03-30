const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego');

// aqui para que creemos el jueguito (POST)
router.post('/create', async (req, res) => {
    try {
      const nuevoJuego = new Juego(req.body);
      await nuevoJuego.save();
      res.status(201).json({
        message: 'Juego creado exitosamente',
        juego: {
          _id: nuevoJuego._id,
          nombre: nuevoJuego.nombre
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// Listar todos los juegos que registran (GET)
router.get('/list', async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.status(200).json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar juego por ID (GET)
router.get('/search/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.status(200).json(juego);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar juego (PUT)
router.put('/update/:id', async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!juegoActualizado) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.status(200).json({ message: 'Juego actualizado exitosamente', juego: juegoActualizado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar juego (DELETE)
router.delete('/delete/:id', async (req, res) => {
  try {
    const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);
    if (!juegoEliminado) {
      return res.status(404).json({ message: 'Juego no encontrado' });
    }
    res.status(200).json({ message: 'Juego eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
