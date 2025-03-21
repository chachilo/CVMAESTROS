import React, { useState, useEffect } from 'react';
import { saveIdiomas } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const IdiomasForm = () => {
  const [idiomas, setIdiomas] = useState([]);
  const [idioma, setIdioma] = useState('');
  const [nivel, setNivel] = useState('');
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

  const handleAddIdioma = () => {
    if (idioma && nivel) {
      setIdiomas([...idiomas, { idioma, nivel }]);
      setIdioma('');
      setNivel('');
    } else {
      alert('Completa todos los campos antes de agregar el idioma.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoElectronico) {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
      return;
    }
    try {
      await saveIdiomas({ correoElectronico, idiomas });
      setMensajeModal('Idiomas guardados exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar los idiomas:', error);
      setMensajeModal('Hubo un error al guardar los idiomas.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Idiomas" />
      <h2>Idiomas</h2>
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

        {/* Idioma */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-translate me-2"></i> {/* Icono de traducción */}
            Idioma
          </label>
          <input
            type="text"
            className="form-control"
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
          />
        </div>

        {/* Nivel */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-bar-chart-fill me-2"></i> {/* Icono de gráfico de barras */}
            Nivel
          </label>
          <label className="form-label">(básico, intermedio, avanzado, nativo)</label>
          <input
            type="text"
            className="form-control"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
          />
        </div>

        {/* Botón para agregar idioma */}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddIdioma}>
          <i className="bi bi-plus-circle me-2"></i> {/* Icono de círculo con signo más */}
          Agregar Idioma
        </button>

        {/* Lista de idiomas agregados */}
        <ul className="list-group mb-3">
          {idiomas.map((idi, index) => (
            <li key={index} className="list-group-item">
              <strong>{idi.idioma}</strong> - {idi.nivel}
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

export default IdiomasForm;