import React, { useState, useEffect } from 'react';
import { saveExperienciaLaboral } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const ExperienciaLaboralForm = () => {
  const [experienciaLaboral, setExperienciaLaboral] = useState([]);
  const [institucion, setInstitucion] = useState('');
  const [puesto, setPuesto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [empresa, setEmpresa] = useState('');
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

  const handleAddExperiencia = () => {
    if (institucion && puesto && descripcion && fechaInicio && empresa) {
      setExperienciaLaboral([...experienciaLaboral, { institucion, puesto, descripcion, fechaInicio, empresa }]);
      setInstitucion('');
      setPuesto('');
      setDescripcion('');
      setFechaInicio('');
      setEmpresa('');
    } else {
      alert('Completa todos los campos antes de agregar la experiencia.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoElectronico) {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
      return;
    }
    try {
      await saveExperienciaLaboral({ correoElectronico, experienciaLaboral });
      setMensajeModal('Experiencia laboral guardada exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar la experiencia laboral:', error);
      setMensajeModal('Hubo un error al guardar la experiencia laboral.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Experiencia Laboral" />
      <h2>Experiencia Laboral</h2>
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

        {/* Institución / Empresa */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-building me-2"></i> {/* Icono de edificio */}
            Experiencia Docente
          </label>
          <label className="form-label">(en caso de un si diga cual es la institucion en la que trabajo)</label>
          <input
            type="text"
            className="form-control"
            value={institucion}
            onChange={(e) => setInstitucion(e.target.value)}
          />
        </div>

        {/* Puesto */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-briefcase-fill me-2"></i> {/* Icono de maletín */}
            Puesto
          </label>
          <input
            type="text"
            className="form-control"
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
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

        {/* Fecha de Inicio */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-calendar-fill me-2"></i> {/* Icono de calendario */}
            Fecha de Inicio
          </label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        {/* Empresa */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-building me-2"></i> {/* Icono de edificio */}
            Empresa
          </label>
          <input
            type="text"
            className="form-control"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          />
        </div>

        {/* Botón para agregar experiencia */}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddExperiencia}>
          <i className="bi bi-plus-circle me-2"></i> {/* Icono de círculo con signo más */}
          Agregar Experiencia
        </button>

        {/* Lista de experiencias agregadas */}
        <ul className="list-group mb-3">
          {experienciaLaboral.map((exp, index) => (
            <li key={index} className="list-group-item">
              <strong>{exp.institucion}</strong> - {exp.puesto}
              <p>{exp.descripcion}</p>
              <p>{exp.fechaInicio}</p>
              <p>{exp.empresa}</p>
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

export default ExperienciaLaboralForm;