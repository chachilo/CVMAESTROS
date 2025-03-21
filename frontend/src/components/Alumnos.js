import React, { useState, useEffect } from 'react';
import { obtenerGrupos, crearAlumno, obtenerAlumnos, eliminarAlumno } from '../services/api'; // Importar funciones de servicio
import ModalNotificacion from './ModalNotificacion'; // Importar el componente Modal
import Navbar from './Navbar'; // Importar el componente Navbar
import Breadcrumbs from './Breadcrumbs'; // Importar el componente Breadcrumbs

const Alumnos = () => {
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [numeroControl, setNumeroControl] = useState('');
  const [grupoId, setGrupoId] = useState('');
  const [grupos, setGrupos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el Modal
  const [modalMensaje, setModalMensaje] = useState(''); // Mensaje del Modal
  const [modalTipo, setModalTipo] = useState('success'); // Tipo de Modal (success, danger, etc.)

  // Obtener la lista de grupos al cargar el componente
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const grupos = await obtenerGrupos();
        setGrupos(grupos);
      } catch (err) {
        mostrarModal(err.message, 'danger');
      }
    };
    fetchGrupos();
  }, []);

  // Obtener la lista de alumnos al cargar el componente
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const alumnos = await obtenerAlumnos();
        setAlumnos(alumnos);
      } catch (err) {
        mostrarModal(err.message, 'danger');
      }
    };
    fetchAlumnos();
  }, []);

  // Función para mostrar el Modal
  const mostrarModal = (mensaje, tipo = 'success') => {
    setModalMensaje(mensaje);
    setModalTipo(tipo);
    setShowModal(true);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearAlumno(nombreAlumno, numeroControl, grupoId);
      mostrarModal('Alumno creado exitosamente');
      setNombreAlumno('');
      setNumeroControl('');
      setGrupoId('');
      // Actualizar la lista de alumnos después de crear uno nuevo
      const alumnosActualizados = await obtenerAlumnos();
      setAlumnos(alumnosActualizados);
    } catch (err) {
      mostrarModal(err.message, 'danger');
    }
  };

  // Función para eliminar un alumno
  const handleEliminarAlumno = async (id) => {
    try {
      await eliminarAlumno(id);
      mostrarModal('Alumno eliminado exitosamente');
      // Actualizar la lista de alumnos después de eliminar uno
      const alumnosActualizados = await obtenerAlumnos();
      setAlumnos(alumnosActualizados);
    } catch (err) {
      mostrarModal(err.message, 'danger');
    }
  };

  // Función para agrupar alumnos por grupo
  const alumnosAgrupados = alumnos.reduce((acc, alumno) => {
    const grupoNombre = alumno.grupoId?.nombre || 'Sin grupo';
    if (!acc[grupoNombre]) {
      acc[grupoNombre] = [];
    }
    acc[grupoNombre].push(alumno);
    return acc;
  }, {});

  return (
    <div>
      <Navbar /> {/* Agregar Navbar */}
      <div className="container mt-4">
        <Breadcrumbs /> {/* Agregar Breadcrumbs */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Agregar Alumno</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreAlumno" className="form-label">
                  Nombre del alumno
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreAlumno"
                  placeholder="Nombre del alumno"
                  value={nombreAlumno}
                  onChange={(e) => setNombreAlumno(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numeroControl" className="form-label">
                  Número de control
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="numeroControl"
                  placeholder="Número de control"
                  value={numeroControl}
                  onChange={(e) => setNumeroControl(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="grupoId" className="form-label">
                  Grupo
                </label>
                <select
                  className="form-select"
                  id="grupoId"
                  value={grupoId}
                  onChange={(e) => setGrupoId(e.target.value)}
                  required
                >
                  <option value="">Selecciona un grupo</option>
                  {grupos.map((grupo) => (
                    <option key={grupo._id} value={grupo._id}>
                      {grupo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Agregar Alumno
              </button>
            </form>
          </div>
        </div>

        {/* Lista de alumnos agrupados por grupo */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h2 className="card-title">Lista de Alumnos</h2>
            {Object.entries(alumnosAgrupados).map(([grupoNombre, alumnos]) => (
              <div key={grupoNombre} className="mb-4">
                <h3>{grupoNombre}</h3>
                <ul className="list-group">
                  {alumnos.map((alumno) => (
                    <li key={alumno._id} className="list-group-item d-flex justify-content-between align-items-center">
                      {alumno.nombre} - <strong>Número de control:</strong> {alumno.numeroControl}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminarAlumno(alumno._id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de notificación */}
        <ModalNotificacion
          show={showModal}
          onClose={() => setShowModal(false)}
          mensaje={modalMensaje}
          tipo={modalTipo}
        />
      </div>
    </div>
  );
};

export default Alumnos;