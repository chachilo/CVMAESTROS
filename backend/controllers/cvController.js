const CV = require('../models/CV');

// Guardar información personal
exports.saveInformacionPersonal = async (req, res) => {
  try {
    const { correoElectronico, nombreCompleto, telefono, direccion, nacionalidad, linkedin, facebook, instagram, twitter, resumenProfesional } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      cv = new CV({ correoElectronico });
    }
    cv.nombreCompleto = nombreCompleto;
    cv.telefono = telefono;
    cv.direccion = direccion;
    cv.nacionalidad = nacionalidad;
    cv.linkedin = linkedin;
    cv.facebook = facebook;
    cv.instagram = instagram;
    cv.twitter = twitter;
    cv.resumenProfesional = resumenProfesional;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la información personal', error });
  }
};

// Guardar experiencia laboral
exports.saveExperienciaLaboral = async (req, res) => {
  try {
    const { correoElectronico, experienciaLaboral } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    cv.experienciaLaboral = experienciaLaboral;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la experiencia laboral', error });
  }
};

// Guardar educación
exports.saveEducacion = async (req, res) => {
  try {
    const { correoElectronico, educacion } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    cv.educacion = educacion;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la educación', error });
  }
};

// Guardar habilidades
exports.saveHabilidades = async (req, res) => {
  try {
    const { correoElectronico, habilidades } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    cv.habilidades = habilidades;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar las habilidades', error });
  }
};

// Guardar idiomas
exports.saveIdiomas = async (req, res) => {
  try {
    const { correoElectronico, idiomas } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    cv.idiomas = idiomas;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar los idiomas', error });
  }
};

// Guardar certificaciones
exports.saveCertificaciones = async (req, res) => {
  try {
    const { correoElectronico, certificaciones } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    cv.certificaciones = certificaciones;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar las certificaciones', error });
  }
};

// Guardar publicaciones
exports.savePublicaciones = async (req, res) => {
  try {
    const { correoElectronico, publicaciones } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    cv.publicaciones = publicaciones;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar las publicaciones', error });
  }
};

// Guardar referencias
exports.saveReferencias = async (req, res) => {
  try {
    const { correoElectronico, referencias } = req.body;
    let cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    cv.referencias = referencias;
    await cv.save();
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar las referencias', error });
  }
};

// Obtener un CV por correo electrónico
exports.getCV = async (req, res) => {
  try {
    const { correoElectronico } = req.params;
    const cv = await CV.findOne({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    res.status(200).json(cv);
  } catch (error) {
    console.error('Error al obtener el CV:', error);
    res.status(500).json({ message: 'Error al obtener el CV', error: error.message });
  }
};

// Obtener todos los CVs
exports.getAllCVs = async (req, res) => {
  try {
    console.log('Solicitud recibida para obtener todos los CVs');
    const cvs = await CV.find();
    console.log('CVs obtenidos:', cvs);
    res.status(200).json(cvs);
  } catch (error) {
    console.error('Error al obtener los CVs:', error);
    res.status(500).json({ message: 'Error al obtener los CVs', error });
  }
};

// Eliminar un CV por correo electrónico
exports.deleteCV = async (req, res) => {
  try {
    const { correoElectronico } = req.params;
    const cv = await CV.findOneAndDelete({ correoElectronico });
    if (!cv) {
      return res.status(404).json({ message: 'CV no encontrado' });
    }
    res.status(200).json({ message: 'CV eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el CV', error });
  }
};