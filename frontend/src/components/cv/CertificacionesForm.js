import React, { useState, useEffect } from 'react';
import { saveCertificaciones } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const CertificacionesForm = () => {
  const [certificaciones, setCertificaciones] = useState([]);
  const [nombre, setNombre] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [fechaObtencion, setFechaObtencion] = useState('');
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

  const handleAddCertificacion = () => {
    if (nombre && institucion && fechaObtencion) {
      setCertificaciones([...certificaciones, { nombre, institucion, fechaObtencion }]);
      setNombre('');
      setInstitucion('');
      setFechaObtencion('');
    } else {
      alert('Completa todos los campos antes de agregar la certificación.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoElectronico) {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
      return;
    }
    try {
      await saveCertificaciones({ correoElectronico, certificaciones });
      setMensajeModal('Certificaciones guardadas exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar las certificaciones:', error);
      setMensajeModal('Hubo un error al guardar las certificaciones.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Certificaciones" />
      <h2>Certificaciones</h2>
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

        {/* Nombre de la certificación */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-award-fill me-2"></i> {/* Icono de premio */}
            Nombre de la Certificación
          </label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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

        {/* Fecha de Obtención */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-calendar-fill me-2"></i> {/* Icono de calendario */}
            Fecha de Obtención
          </label>
          <input
            type="date"
            className="form-control"
            value={fechaObtencion}
            onChange={(e) => setFechaObtencion(e.target.value)}
          />
        </div>

        {/* Botón para agregar certificación */}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddCertificacion}>
          <i className="bi bi-plus-circle me-2"></i> {/* Icono de círculo con signo más */}
          Agregar Certificación
        </button>

        {/* Lista de certificaciones agregadas */}
        <ul className="list-group mb-3">
          {certificaciones.map((cert, index) => (
            <li key={index} className="list-group-item">
              <strong>{cert.nombre}</strong> - {cert.institucion}
              <p>{cert.fechaObtencion}</p>
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

export default CertificacionesForm;