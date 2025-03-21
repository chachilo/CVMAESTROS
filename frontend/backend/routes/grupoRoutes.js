const express = require('express');
const grupoController = require('../controllers/grupoController');

const router = express.Router();

// Rutas para grupos
router.post('/', grupoController.crearGrupo); // Crear un grupo
router.get('/', grupoController.obtenerGrupos); // Obtener todos los grupos
router.delete('/:id', grupoController.eliminarGrupo); // Eliminar un grupo por ID

module.exports = router;