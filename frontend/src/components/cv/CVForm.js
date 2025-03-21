import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import Navbar from '../Navbar'; // Importar el Navbar
import InformacionPersonalForm from './InformacionPersonalForm';
import ExperienciaLaboralForm from './ExperienciaLaboralForm';
import EducacionForm from './EducacionForm';
import HabilidadesForm from './HabilidadesForm';
import IdiomasForm from './IdiomasForm';
import CertificacionesForm from './CertificacionesForm';
import PublicacionesForm from './PublicacionesForm';
import ReferenciasForm from './ReferenciasForm';

const CVForm = () => {
  const [activeTab, setActiveTab] = useState('informacion-personal'); // Estado para la pestaña activa

  return (
    <div>
      {/* Navbar en la parte superior */}
      <Navbar />

      {/* Contenedor del CV */}
      <div className="container mt-4">
        <h2>Crear CV</h2>

        {/* Pestañas del CV */}
        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="informacion-personal">Información Personal</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="experiencia-laboral">Experiencia Laboral</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="educacion">Educación</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="habilidades">Habilidades</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="idiomas">Idiomas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="certificaciones">Certificaciones</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="publicaciones">Publicaciones</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="referencias">Referencias</Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Contenido de las pestañas */}
          <Tab.Content>
            <Tab.Pane eventKey="informacion-personal">
              <InformacionPersonalForm />
            </Tab.Pane>
            <Tab.Pane eventKey="experiencia-laboral">
              <ExperienciaLaboralForm />
            </Tab.Pane>
            <Tab.Pane eventKey="educacion">
              <EducacionForm />
            </Tab.Pane>
            <Tab.Pane eventKey="habilidades">
              <HabilidadesForm />
            </Tab.Pane>
            <Tab.Pane eventKey="idiomas">
              <IdiomasForm />
            </Tab.Pane>
            <Tab.Pane eventKey="certificaciones">
              <CertificacionesForm />
            </Tab.Pane>
            <Tab.Pane eventKey="publicaciones">
              <PublicacionesForm />
            </Tab.Pane>
            <Tab.Pane eventKey="referencias">
              <ReferenciasForm />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default CVForm;