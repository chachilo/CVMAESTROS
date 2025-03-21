import React, { useState, useEffect } from 'react';
import { crearGrupo, obtenerGrupos, eliminarGrupo } from '../services/api'; // Importar funciones
import ModalNotificacion from './ModalNotificacion'; // Importar el componente Modal
import Navbar from './Navbar'; // Importar el componente Navbar
import Breadcrumbs from './Breadcrumbs'; // Importar el componente Breadcrumbs

const Grupos = () => {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [grupos, setGrupos] = useState([]);
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
      await crearGrupo(nombreGrupo);
      mostrarModal('Grupo creado exitosamente');
      setNombreGrupo('');
      // Actualizar la lista de grupos después de crear uno nuevo
      const gruposActualizados = await obtenerGrupos();
      setGrupos(gruposActualizados);
    } catch (err) {
      mostrarModal(err.message, 'danger');
    }
  };

  // Función para eliminar un grupo
  const handleEliminarGrupo = async (id) => {
    try {
      await eliminarGrupo(id);
      mostrarModal('Grupo eliminado exitosamente');
      // Actualizar la lista de grupos después de eliminar uno
      const gruposActualizados = await obtenerGrupos();
      setGrupos(gruposActualizados);
    } catch (err) {
      mostrarModal(err.message, 'danger');
    }
  };

  return (
    <div>
      <Navbar /> {/* Agregar Navbar */}
      <div className="container mt-4">
        <Breadcrumbs /> {/* Agregar Breadcrumbs */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Crear Grupo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreGrupo" className="form-label">
                  Nombre del grupo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreGrupo"
                  placeholder="Nombre del grupo"
                  value={nombreGrupo}
                  onChange={(e) => setNombreGrupo(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Crear Grupo
              </button>
            </form>
          </div>
        </div>

        {/* Lista de grupos */}
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h2 className="card-title">Lista de Grupos</h2>
            <ul className="list-group">
              {grupos.map((grupo) => (
                <li key={grupo._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {grupo.nombre}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminarGrupo(grupo._id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
  );
};

export default Grupos;