import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Grupos from './components/Grupos';
import Alumnos from './components/Alumnos';
import Asistencia from './components/Asistencia';
import CVForm from './components/cv/CVForm';
import CVView from './components/CVView';
import CVList from './components/CVList';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute'; // Importar el componente ProtectedRoute
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grupos"
            element={
              <ProtectedRoute>
                <Grupos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumnos"
            element={
              <ProtectedRoute>
                <Alumnos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/asistencia"
            element={
              <ProtectedRoute>
                <Asistencia />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cv/form"
            element={
              <ProtectedRoute>
                <CVForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cv/view/:correoElectronico"
            element={
              <ProtectedRoute>
                <CVView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cv/lista"
            element={
              <ProtectedRoute>
                <CVList />
              </ProtectedRoute>
            }
          />

          {/* Ruta para manejar rutas no encontradas (404) */}
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/NotFound" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;