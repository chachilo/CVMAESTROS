import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Aquí puedes implementar la lógica para verificar si el usuario está autenticado
  const isAuthenticated = localStorage.getItem('token'); // Ejemplo simple usando localStorage

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderiza el componente hijo
  return children;
};

export default ProtectedRoute;