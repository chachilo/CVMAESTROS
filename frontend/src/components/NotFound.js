import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir al dashboard después de 10 segundos
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 10000); // 10 segundos

    // Limpiar el timer si el componente se desmonta
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Página no encontrada</p>
        <p>Serás redirigido al dashboard en 10 segundos...</p>
        <Link to="/dashboard" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;