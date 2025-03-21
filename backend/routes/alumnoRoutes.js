const express = require('express');
const alumnoController = require('../controllers/alumnoController');

const router = express.Router();

// Rutas para alumnos
router.post('/', alumnoController.crearAlumno); // Crear un alumno
router.get('/', alumnoController.obtenerAlumnos); // Obtener todos los alumnos
router.delete('/:id', alumnoController.eliminarAlumno); // Eliminar un alumno por ID

module.exports = router;