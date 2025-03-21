const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// Información Personal
router.post('/informacion-personal', cvController.saveInformacionPersonal);
router.post('/experiencia-laboral', cvController.saveExperienciaLaboral);
router.post('/educacion', cvController.saveEducacion);
router.post('/habilidades', cvController.saveHabilidades);
router.post('/idiomas', cvController.saveIdiomas);
router.post('/certificaciones', cvController.saveCertificaciones);
router.post('/publicaciones', cvController.savePublicaciones);
router.post('/referencias', cvController.saveReferencias);

// Ruta para obtener todos los CVs
router.get('/lista', cvController.getAllCVs);

// Obtener CV (debe ir al final para evitar conflictos con las rutas anteriores)
router.get('/:correoElectronico', cvController.getCV);
router.delete('/:correoElectronico', cvController.deleteCV);

module.exports = router;
