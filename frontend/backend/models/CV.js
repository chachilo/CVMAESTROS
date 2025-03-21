const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
  nombreCompleto: String,
  correoElectronico: String,
  telefono: String,
  direccion: String,
  nacionalidad: String,
  linkedin: String,
  facebook: String,
  instagram: String,
  twitter: String,
  resumenProfesional: String,
  experienciaLaboral: [
    {
      institucion: String,
      puesto: String,
      descripcion: String,
      fechaInicio: Date,
      fechaFin: Date,
    },
  ],
  educacion: [
    {
      institucion: String,
      titulo: String,
      campoEstudio: String,
      fechaInicio: Date,
      fechaFin: Date,
    },
  ],
  habilidades: [
    {
      nombre: String,
      nivel: String,
    },
  ],
  idiomas: [
    {
      nombre: String,
      nivel: String,
    },
  ],
  certificaciones: [
    {
      nombre: String,
      institucion: String,
      fechaObtencion: Date,
    },
  ],
  publicaciones: [
    {
      titulo: String,
      descripcion: String,
    },
  ],
  referencias: [
    {
      nombre: String,
      telefono: String,
    },
  ],
});

module.exports = mongoose.model('CV', CVSchema);