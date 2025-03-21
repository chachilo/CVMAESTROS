import React from 'react';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';

const Dashboard = () => {
  return (
    <div>
      <Navbar /> {/* Navbar en la parte superior */}
      <div className="container mt-4">
        <Breadcrumbs /> {/* Breadcrumbs */}
        <h2>Dashboard</h2>
        <p className="lead">Bienvenido al panel de control. Selecciona una opción del menú para comenzar.</p>

        {/* Imagen de bienvenida */}
        <div className="text-center mb-4">
          <img
            src="https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Reemplaza con una imagen real
            alt="Bienvenido"
            className="img-fluid rounded"
          />
        </div>

        {/* Tarjetas con información */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Grupos</h5>
                <p className="card-text">
                  Gestiona los grupos de estudiantes y asigna actividades.
                </p>
                <a href="/grupos" className="btn btn-primary">
                  Ir a Grupos
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Alumnos</h5>
                <p className="card-text">
                  Administra la información de los alumnos y su progreso.
                </p>
                <a href="/alumnos" className="btn btn-primary">
                  Ir a Alumnos
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Asistencia</h5>
                <p className="card-text">
                  Registra y consulta la asistencia de los estudiantes.
                </p>
                <a href="/asistencia" className="btn btn-primary">
                  Ir a Asistencia
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;