import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ModalNotificacion from './ModalNotificacion'; // Importamos el componente ModalNotificacion

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [modalMensaje, setModalMensaje] = useState(''); // Mensaje que se mostrará en el modal
  const [modalTipo, setModalTipo] = useState('success'); // Tipo de modal (success, danger, etc.)
  const { token } = useParams();
  const navigate = useNavigate();

  const mostrarModal = (mensaje, tipo = 'success') => {
    setModalMensaje(mensaje);
    setModalTipo(tipo);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', { token, newPassword });
      mostrarModal('Contraseña restablecida exitosamente. Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login'); // Redirigir al login después de 2 segundos
      }, 2000);
    } catch (err) {
      mostrarModal(err.response?.data?.error || 'Error al restablecer la contraseña', 'danger');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: '400px' }}>
        <h2 className="card-title text-center mb-4">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Nueva Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Ingresa tu nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Restablecer Contraseña
          </button>
        </form>
      </div>

      {/* Modal de Notificación */}
      <ModalNotificacion
        show={showModal}
        onClose={() => setShowModal(false)}
        mensaje={modalMensaje}
        tipo={modalTipo}
      />
    </div>
  );
};

export default ResetPassword;