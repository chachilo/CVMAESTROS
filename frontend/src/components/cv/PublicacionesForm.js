import React, { useState, useEffect } from 'react';
import { savePublicaciones } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const PublicacionesForm = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [mensajeModal, setMensajeModal] = useState(''); // Estado para el mensaje del modal
  const [tipoModal, setTipoModal] = useState('success'); // Estado para el tipo del modal

  // Obtener correo guardado desde localStorage
  useEffect(() => {
    const storedCorreo = localStorage.getItem('correoElectronico');
    if (storedCorreo) {
      setCorreoElectronico(storedCorreo);
    } else {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
    }
  }, []);

  const handleAddPublicacion = () => {
    if (titulo.trim() && descripcion.trim()) {
      setPublicaciones([...publicaciones, { titulo, descripcion }]);
      setTitulo('');
      setDescripcion('');
    } else {
      alert('Completa todos los campos antes de agregar la publicación.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoElectronico) {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
      return;
    }
    try {
      await savePublicaciones({ correoElectronico, publicaciones });
      setMensajeModal('Publicaciones guardadas exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar las publicaciones:', error);
      setMensajeModal('Hubo un error al guardar las publicaciones.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Publicaciones" />
      <h2>Publicaciones</h2>
      <form onSubmit={handleSubmit}>
        {/* Mostrar correo electrónico (solo lectura) */}
        {/* <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-envelope-fill me-2"></i> 
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            value={correoElectronico}
            readOnly
          />
        </div> */}

        {/* Título */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-bookmark-fill me-2"></i> {/* Icono de marcador */}
            Título
          </label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-card-text me-2"></i> {/* Icono de tarjeta de texto */}
            Descripción
          </label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="3"
          />
        </div>

        {/* Botón para agregar publicación */}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddPublicacion}>
          <i className="bi bi-plus-circle me-2"></i> {/* Icono de círculo con signo más */}
          Agregar Publicación
        </button>

        {/* Lista de publicaciones agregadas */}
        <ul className="list-group mb-3">
          {publicaciones.map((pub, index) => (
            <li key={index} className="list-group-item">
              <strong>{pub.titulo}</strong>
              <p>{pub.descripcion}</p>
            </li>
          ))}
        </ul>

        {/* Botón de guardar */}
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-save-fill me-2"></i> {/* Icono de guardar */}
          Guardar
        </button>
      </form>

      {/* Modal de notificación */}
      <ModalNotificacion
        show={showModal}
        onClose={() => setShowModal(false)}
        mensaje={mensajeModal}
        tipo={tipoModal}
      />
    </div>
  );
};

export default PublicacionesForm;