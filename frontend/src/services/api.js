import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const saveInformacionPersonal = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/informacion-personal', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar información personal:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar la información personal");
  }
};

export const saveExperienciaLaboral = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/experiencia-laboral', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar la experiencia laboral:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar la experiencia laboral");
  }
};

export const saveEducacion = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/educacion', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar la educación:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar la educación");
  }
};

export const saveHabilidades = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/habilidades', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar las habilidades:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar las habilidades");
  }
};

export const saveIdiomas = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/idiomas', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar los idiomas:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar los idiomas");
  }
};

export const saveCertificaciones = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/certificaciones', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar las certificaciones:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar las certificaciones");
  }
};

export const savePublicaciones = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/publicaciones', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar las publicaciones:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar las publicaciones");
  }
};

export const saveReferencias = async (data) => {
  console.log("Datos enviados al backend:", data); // Debug

  try {
    const response = await api.post('/cv/referencias', data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Error al guardar las referencias:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al guardar las referencias");
  }
};

export const getCV = async (correoElectronico) => {
  try {
    console.log(`Sending request to /cv/${correoElectronico}`);
    const response = await api.get(`/cv/${correoElectronico}`);
    console.log('Response from /cv/:correoElectronico:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el CV:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al obtener el CV");
  }
};

export const deleteCV = async (correoElectronico) => {
  try {
    const response = await api.delete(`/cv/${correoElectronico}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el CV:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al eliminar el CV");
  }
};

export const getAllCVs = async () => {
  try {
    console.log('Sending request to /cv/lista');
    const response = await api.get('/cv/lista');
    console.log('Response from /cv/lista:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los CVs:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al obtener los CVs");
  }
};

// Función para crear un grupo
export const crearGrupo = async (nombre) => {
  try {
    const response = await api.post('/grupos', { nombre });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al crear el grupo');
  }
};

// Función para obtener todos los grupos
export const obtenerGrupos = async () => {
  try {
    const response = await api.get('/grupos');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener los grupos');
  }
};

// Función para eliminar un grupo
export const eliminarGrupo = async (id) => {
  try {
    const response = await api.delete(`/grupos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al eliminar el grupo');
  }
};

// Función para crear un alumno
export const crearAlumno = async (nombre, numeroControl, grupoId) => {
  try {
    const response = await api.post('/alumnos', { nombre, numeroControl, grupoId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al crear el alumno');
  }
};

// Función para obtener todos los alumnos
export const obtenerAlumnos = async () => {
  try {
    const response = await api.get('/alumnos');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener los alumnos');
  }
};

// Función para eliminar un alumno por ID
export const eliminarAlumno = async (id) => {
  try {
    const response = await api.delete(`/alumnos/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al eliminar el alumno');
  }
};

// Función para guardar la asistencia
export const guardarAsistencia = async (asistencias) => {
  try {
    const response = await api.post('/asistencias', { asistencias });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al guardar la asistencia');
  }
};

// Función para obtener las asistencias
export const obtenerAsistencias = async () => {
  try {
    const response = await api.get('/asistencias');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al obtener las asistencias');
  }
};


