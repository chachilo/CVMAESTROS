import React, { useState, useEffect } from 'react';
import { saveReferencias } from '../../services/api';
import Breadcrumbs from '../Breadcrumbs';
import ModalNotificacion from '../ModalNotificacion'; // Importar ModalNotificacion

const ReferenciasForm = () => {
  const [referencias, setReferencias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
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

  const handleAddReferencia = () => {
    if (nombre.trim() && telefono.trim()) {
      setReferencias([...referencias, { nombre, telefono }]);
      setNombre('');
      setTelefono('');
    } else {
      alert('Completa todos los campos antes de agregar la referencia.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correoElectronico) {
      alert('No se encontró un correo electrónico. Verifica la información personal.');
      return;
    }
    try {
      await saveReferencias({ correoElectronico, referencias });
      setMensajeModal('Referencias guardadas exitosamente');
      setTipoModal('success');
      setShowModal(true);
    } catch (error) {
      console.error('Error al guardar las referencias:', error);
      setMensajeModal('Hubo un error al guardar las referencias.');
      setTipoModal('danger');
      setShowModal(true);
    }
  };

  return (
    <div className="container mt-4">
      <Breadcrumbs currentPage="Referencias" />
      <h2>Referencias</h2>
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

        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-person-fill me-2"></i> {/* Icono de persona */}
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        {/* Botón para agregar referencia */}
        <button type="button" className="btn btn-secondary mb-3" onClick={handleAddReferencia}>
          <i className="bi bi-plus-circle me-2"></i> {/* Icono de círculo con signo más */}
          Agregar Referencia
        </button>

        {/* Lista de referencias agregadas */}
        <ul className="list-group mb-3">
          {referencias.map((ref, index) => (
            <li key={index} className="list-group-item">
              <strong>{ref.nombre}</strong> - {ref.telefono}
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

export default ReferenciasForm;