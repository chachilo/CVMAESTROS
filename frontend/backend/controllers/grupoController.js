const Grupo = require('../models/Grupo');

// Crear un nuevo grupo
exports.crearGrupo = async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoGrupo = new Grupo({ nombre });
    await nuevoGrupo.save();
    res.status(201).json({ mensaje: 'Grupo creado exitosamente', grupo: nuevoGrupo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los grupos
exports.obtenerGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.find();
    res.status(200).json(grupos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un grupo por ID
exports.eliminarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    await Grupo.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Grupo eliminado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};