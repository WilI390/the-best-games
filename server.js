require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const juegoRoutes = require('./routes/juegoRoutes');
const Juego = require('./models/Juego'); // Importamoss el modelo de Juego

console.log('Tipo de juegoRoutes:', typeof juegoRoutes);
console.log('Contenido de juegoRoutes:', juegoRoutes);

const app = express();
const port = process.env.PORT || 3000;

// Conectar a base de datos elegida en el foro MongoDB
mongoose.connect('mongodb://localhost:27017/juegosDB')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Rutas
app.use('/juegos', juegoRoutes);
app.use(express.static('views'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Ruta para mostrar los detalles del juego por ID
app.get('/juegos/detalle/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const juego = await Juego.findById(id);

    if (!juego) {
      return res.status(404).send('<h1>Juego no encontrado</h1>');
    }

    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${juego.nombre}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f9f9f9;
            padding: 20px;
          }
          img {
            width: 400px;
            border-radius: 10px;
          }
          a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
          a:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <h1>${juego.nombre}</h1>
        <img src="${juego.imagen}" alt="${juego.nombre}">
        <p><strong>Descripción:</strong> ${juego.descripcion}</p>
        <p><strong>Consola:</strong> ${juego.consola}</p>
        <p><strong>Año de Lanzamiento:</strong> ${juego.anioLanzamiento}</p>
        <p><strong>Número de Jugadores:</strong> ${juego.numeroJugadores}</p>
        <a href="/index.html">Volver al Inicio</a>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('<h1>Error al obtener los detalles del juego</h1>');
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
