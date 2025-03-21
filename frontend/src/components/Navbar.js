import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName'); // Recuperar el nombre del usuario
  const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    localStorage.removeItem('userName'); // Eliminar el nombre del usuario
    navigate('/login'); // Redirigir al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          <i className="bi bi-house-door-fill me-2"></i> {/* Icono de casa */}
          Panel Maestros
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="bi bi-speedometer2 me-2"></i> {/* Icono de dashboard */}
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/grupos">
                <i className="bi bi-people-fill me-2"></i> {/* Icono de grupos */}
                Grupos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/alumnos">
                <i className="bi bi-person-lines-fill me-2"></i> {/* Icono de alumnos */}
                Alumnos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/asistencia">
                <i className="bi bi-calendar-check-fill me-2"></i> {/* Icono de asistencia */}
                Asistencia
              </Link>
            </li>
            {/* Menú desplegable para CV */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownCV"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-file-earmark-person-fill me-2"></i> {/* Icono de CV */}
                CV
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownCV">
                <li>
                  <Link className="dropdown-item" to="/cv/form">
                    <i className="bi bi-plus-circle-fill me-2"></i> {/* Icono de crear */}
                    Crear CV
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cv/lista">
                    <i className="bi bi-list-ul me-2"></i> {/* Icono de lista */}
                    Ver CVs
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {/* Mostrar el nombre del usuario y el botón de cerrar sesión si está autenticado */}
          {isAuthenticated && (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">
                <i className="bi bi-person-circle me-2"></i> {/* Icono de usuario */}
                Bienvenido, {userName}
              </span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> {/* Icono de cerrar sesión */}
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;