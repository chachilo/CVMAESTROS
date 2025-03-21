require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const cvRoutes = require('./routes/cvRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware para seguridad
app.use(helmet());

// Limitador de tasa de solicitudes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 solicitudes por ventana
});
app.use(limiter);

// Middleware para parsear JSON
app.use(express.json());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/maestros')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión a MongoDB:', err));


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/grupos', grupoRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/cv', cvRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));