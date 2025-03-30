const mongoose = require('mongoose');

// Definimos el esquema para la entidad Juegos
const juegoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del juego es obligatorio.'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    trim: true
  },
  consola: {
    type: String,
    required: [true, 'La consola es obligatoria.'],
    trim: true
  },
  anioLanzamiento: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio.'],
    min: [1950, 'El año debe ser mayor o igual a 1950.'],
    max: [new Date().getFullYear(), 'El año no puede ser mayor al actual.']
  },
  numeroJugadores: {
    type: Number,
    required: [true, 'El número de jugadores es obligatorio.'],
    min: [1, 'Debe haber al menos un jugador.']
  },
  imagen: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria.'],
    trim: true,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/i.test(value);
      },
      message: 'Por favor, proporciona una URL válida de imagen (png, jpg, jpeg o webp).'
    }
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Creamos y exportamos el modelo
const Juego = mongoose.model('Juego', juegoSchema);
module.exports = Juego;
