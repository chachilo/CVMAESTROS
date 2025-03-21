const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

router.post('/', asistenciaController.guardarAsistencia);
router.get('/', asistenciaController.obtenerAsistencias);


module.exports = router;