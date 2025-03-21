const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
  alumnoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Alumno', required: true },
  fecha: { type: Date, default: Date.now },
  asistio: { type: Boolean, required: true },
});

module.exports = mongoose.model('Asistencia', asistenciaSchema);