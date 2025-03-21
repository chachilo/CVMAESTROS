import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveInformacionPersonal } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const InformacionPersonalForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    nombreCompleto: localStorage.getItem('userName') || '',
    correoElectronico: localStorage.getItem('correoElectronico') || '',
    telefono: '',
    direccion: '',
    nacionalidad: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
    resumenProfesional: '',
  });

  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [mensajeModal, setMensajeModal] = useState(''); // Estado para el mensaje del modal
  const [tipoModal, setTipoModal] = useState('success'); // Estado para el tipo del modal

  useEffect(() => {
    const storedNombre = localStorage.getItem('userName');
    const storedCorreo = localStorage.getItem('correoElectronico');
    if (storedNombre) {
      setFormData((prevData) => ({ ...prevData, nombreCompleto: storedNombre }));
    }
    if (storedCorreo) {
      setFormData((prevData) => ({ ...prevData, correoElectronico: storedCorreo }));
    }
    if (location.state && location.state.cvData) {
      setFormData((prevData) => ({ ...prevData, ...location.state.cvData }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveInformacionPersonal(formData);
      localStorage.setItem('nombreCompleto', formData.nombreCompleto); // Guardar el nombre en localStorage
      localStorage.setItem('correoElectronico', formData.correoElectronico); // Guardar el correo en localStorage
      setMensajeModal('Información personal guardada exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar la información personal:', error);
      setMensajeModal('Hubo un error al guardar la información personal.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Información Personal" />
      <h2>Información Personal</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre completo */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-person-fill me-2"></i> {/* Icono de persona */}
            Nombre completo
          </label>
          <input
            type="text"
            name="nombreCompleto"
            className="form-control"
            value={formData.nombreCompleto}
            onChange={handleChange}
            disabled
            required
          />
        </div>

        {/* Correo electrónico */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-envelope-fill me-2"></i> {/* Icono de correo */}
            Correo electrónico
          </label>
          <input
            type="email"
            name="correoElectronico"
            className="form-control"
            value={formData.correoElectronico}
            onChange={handleChange}
            disabled
            required
          />
        </div>

        {/* Teléfono */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-telephone-fill me-2"></i> {/* Icono de teléfono */}
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        {/* Dirección */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-house-door-fill me-2"></i> {/* Icono de casa */}
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        {/* Nacionalidad */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-globe me-2"></i> {/* Icono de globo */}
            Nacionalidad
          </label>
          <input
            type="text"
            name="nacionalidad"
            className="form-control"
            value={formData.nacionalidad}
            onChange={handleChange}
            required
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-linkedin me-2"></i> {/* Icono de LinkedIn */}
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            className="form-control"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        {/* Facebook */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-facebook me-2"></i> {/* Icono de Facebook */}
            Facebook
          </label>
          <input
            type="text"
            name="facebook"
            className="form-control"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

        {/* Instagram */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-instagram me-2"></i> {/* Icono de Instagram */}
            Instagram
          </label>
          <input
            type="text"
            name="instagram"
            className="form-control"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>

        {/* Twitter */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-twitter me-2"></i> {/* Icono de Twitter */}
            Twitter
          </label>
          <input
            type="text"
            name="twitter"
            className="form-control"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>

        {/* Resumen profesional */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-file-text-fill me-2"></i> {/* Icono de documento */}
            Resumen profesional
          </label>
          <textarea
            name="resumenProfesional"
            className="form-control"
            value={formData.resumenProfesional}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

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

export default InformacionPersonalForm;