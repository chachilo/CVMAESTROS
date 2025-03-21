const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Grupo', grupoSchema);