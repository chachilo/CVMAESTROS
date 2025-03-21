const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Nombre del alumno
  numeroControl: { type: String, required: true, unique: true }, // Número de control (único)
  grupoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Grupo', required: true }, // Referencia al grupo
});

module.exports = mongoose.model('Alumno', alumnoSchema);