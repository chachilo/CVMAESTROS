const Alumno = require('../models/Alumno');
const Grupo = require('../models/Grupo');

// Crear un nuevo alumno
exports.crearAlumno = async (req, res) => {
  try {
    const { nombre, numeroControl, grupoId } = req.body;

    // Verificar si el grupo existe
    const grupo = await Grupo.findById(grupoId);
    if (!grupo) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }

    // Verificar si el número de control ya existe
    const alumnoExistente = await Alumno.findOne({ numeroControl });
    if (alumnoExistente) {
      return res.status(400).json({ error: 'El número de control ya está en uso' });
    }

    const nuevoAlumno = new Alumno({ nombre, numeroControl, grupoId });
    await nuevoAlumno.save();
    res.status(201).json({ mensaje: 'Alumno creado exitosamente', alumno: nuevoAlumno });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los alumnos con información del grupo
exports.obtenerAlumnos = async (req, res) => {
    try {
      const alumnos = await Alumno.find().populate('grupoId', 'nombre'); // Populate para obtener el nombre del grupo
      res.status(200).json(alumnos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Eliminar un alumno por ID
exports.eliminarAlumno = async (req, res) => {
    try {
      const { id } = req.params;
      await Alumno.findByIdAndDelete(id);
      res.status(200).json({ mensaje: 'Alumno eliminado exitosamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };