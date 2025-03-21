import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ModalNotificacion from './ModalNotificacion'; // Cambiamos ToastNotificacion por ModalNotificacion

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // Cambiamos showToast por showModal
  const [modalMensaje, setModalMensaje] = useState(''); // Cambiamos toastMensaje por modalMensaje
  const [modalTipo, setModalTipo] = useState('success'); // Cambiamos toastTipo por modalTipo
  const navigate = useNavigate();

  const mostrarModal = (mensaje, tipo = 'success') => {
    setModalMensaje(mensaje);
    setModalTipo(tipo);
    setShowModal(true);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Guardar el token
      localStorage.setItem('userName', res.data.name); // Guardar el nombre del usuario
      localStorage.setItem('correoElectronico', email); // Guardar el correo electrónico del usuario
      mostrarModal('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (err) {
      mostrarModal(err.response?.data?.error || 'Error al iniciar sesión', 'danger');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm p-4" style={{ width: '400px' }}>
        <h2 className="card-title text-center mb-4">Iniciar sesión</h2>
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/register" className="text-decoration-none">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
        <div className="text-center">
          <Link to="/forgot-password" className="text-decoration-none">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>

      {/* Reemplazamos ToastNotificacion por ModalNotificacion */}
      <ModalNotificacion
        show={showModal}
        onClose={() => setShowModal(false)}
        mensaje={modalMensaje}
        tipo={modalTipo}
      />
    </div>
  );
};

export default Login;