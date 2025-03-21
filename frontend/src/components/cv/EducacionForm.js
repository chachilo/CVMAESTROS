import React, { useState, useEffect } from 'react';
import { saveEducacion } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const EducacionForm = () => {
  const [educacion, setEducacion] = useState([]);
  const [institucion, setInstitucion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [campoEstudio, setCampoEstudio] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
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

  const handleAddEducacion = () => {
    if (institucion && titulo && campoEstudio && fechaInicio && fechaFin) {
      setEducacion([...educacion, { institucion, titulo, campoEstudio, fechaInicio, fechaFin }]);
      setInstitucion('');
      setTitulo('');
      setCampoEstudio('');
      setFechaInicio('');
      setFechaFin('');
    } else {
      alert('Completa todos los campos antes de agregar la educación.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoElectronico) {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
      return;
    }
    try {
      await saveEducacion({ correoElectronico, educacion });
      setMensajeModal('Educación guardada exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar la educación:', error);
      setMensajeModal('Hubo un error al guardar la educación.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Educación" />
      <h2>Educación</h2>
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

        {/* Institución */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-building me-2"></i> {/* Icono de edificio */}
            Institución
          </label>
          <input
            type="text"
            className="form-control"
            value={institucion}
            onChange={(e) => setInstitucion(e.target.value)}
          />
        </div>

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

        {/* Campo de estudio */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-book-fill me-2"></i> {/* Icono de libro */}
            Campo de estudio
          </label>
          <input
            type="text"
            className="form-control"
            value={campoEstudio}
            onChange={(e) => setCampoEstudio(e.target.value)}
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

        {/* Fecha de Fin */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-calendar2-fill me-2"></i> {/* Icono de calendario */}
            Fecha de Fin
          </label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        {/* Botón para agregar educación */}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddEducacion}>
          <i className="bi bi-plus-circle me-2"></i> {/* Icono de círculo con signo más */}
          Agregar Educación
        </button>

        {/* Lista de educación agregada */}
        <ul className="list-group mb-3">
          {educacion.map((edu, index) => (
            <li key={index} className="list-group-item">
              <strong>{edu.institucion}</strong> - {edu.titulo}
              <p>{edu.campoEstudio}</p>
              <p>{edu.fechaInicio} - {edu.fechaFin}</p>
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

export default EducacionForm;