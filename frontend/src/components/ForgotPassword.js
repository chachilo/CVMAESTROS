import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setModalMessage('Correo de recuperación enviado');
      setShowModal(true);
    } catch (err) {
      setModalMessage(err.response.data.error);
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: '400px' }}>
        <h2 className="card-title text-center mb-4">Recuperar contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Enviar
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/login" className="text-decoration-none">
            Volver a iniciar sesión
          </Link>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgotPassword;