import React, { useState, useEffect } from 'react';
import { saveHabilidades } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const HabilidadesForm = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [habilidad, setHabilidad] = useState('');
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

  const handleAddHabilidad = () => {
    if (habilidad && nivel) {
      setHabilidades([...habilidades, { habilidad, nivel }]);
      setHabilidad('');
      setNivel('');
    } else {
      alert('Completa todos los campos antes de agregar la habilidad.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoElectronico) {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
      return;
    }
    try {
      await saveHabilidades({ correoElectronico, habilidades });
      setMensajeModal('Habilidades guardadas exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar las habilidades:', error);
      setMensajeModal('Hubo un error al guardar las habilidades.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Habilidades" />
      <h2>Habilidades</h2>
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

        {/* Habilidad */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-lightbulb-fill me-2"></i> {/* Icono de bombilla */}
            Habilidad
          </label>
          <input
            type="text"
            className="form-control"
            value={habilidad}
            onChange={(e) => setHabilidad(e.target.value)}
          />
        </div>

        {/* Nivel */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-bar-chart-fill me-2"></i> {/* Icono de gráfico de barras */}
            Nivel
          </label>
          <label className="form-label">(malo, regular, bueno, excelente, profesional)</label>
          <input
            type="text"
            className="form-control"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
          />
        </div>

        {/* Botón para agregar habilidad */}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddHabilidad}>
          <i className="bi bi-plus-circle me-2"></i> {/* Icono de círculo con signo más */}
          Agregar Habilidad
        </button>

        {/* Lista de habilidades agregadas */}
        <ul className="list-group mb-3">
          {habilidades.map((hab, index) => (
            <li key={index} className="list-group-item">
              <strong>{hab.habilidad}</strong> - {hab.nivel}
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

export default HabilidadesForm;