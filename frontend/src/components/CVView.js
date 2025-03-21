import React, { useState, useEffect } from 'react';
import { getCV, deleteCV } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import Breadcrumbs from './Breadcrumbs';
import Navbar from './Navbar';

const CVView = () => {
  const [cvData, setCvData] = useState(null);
  const navigate = useNavigate();
  const { correoElectronico } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCV(correoElectronico);
        setCvData(data);
      } catch (error) {
        console.error('Error al obtener el CV:', error);
      }
    };

    fetchData();
  }, [correoElectronico]);

  const handleDelete = async () => {
    try {
      await deleteCV(correoElectronico);
      alert('CV eliminado exitosamente');
      navigate('/cv/form'); // Redirigir a la página de cv-form
    } catch (error) {
      console.error('Error al eliminar el CV:', error);
      alert('Hubo un error al eliminar el CV.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('CV', 10, 10);
    doc.text(`Nombre completo: ${cvData.nombreCompleto}`, 10, 20);
    doc.text(`Correo electrónico: ${cvData.correoElectronico}`, 10, 30);
    doc.text(`Teléfono: ${cvData.telefono}`, 10, 40);
    doc.text(`Dirección: ${cvData.direccion}`, 10, 50);
    doc.text(`Nacionalidad: ${cvData.nacionalidad}`, 10, 60);
    doc.text(`LinkedIn: ${cvData.linkedin}`, 10, 70);
    doc.text(`Facebook: ${cvData.facebook}`, 10, 80);
    doc.text(`Instagram: ${cvData.instagram}`, 10, 90);
    doc.text(`Twitter: ${cvData.twitter}`, 10, 100);
    doc.text(`Resumen profesional: ${cvData.resumenProfesional}`, 10, 110);

    let y = 120;
    doc.text('Experiencia Laboral:', 10, y);
    cvData.experienciaLaboral.forEach((exp, index) => {
      y += 10;
      doc.text(`Institución/Empresa: ${exp.institucion}`, 10, y);
      y += 10;
      doc.text(`Puesto: ${exp.puesto}`, 10, y);
      y += 10;
      doc.text(`Descripción: ${exp.descripcion}`, 10, y);
      y += 10;
      doc.text(`Fecha de Inicio: ${exp.fechaInicio}`, 10, y);
      y += 10;
      doc.text(`Fecha de Fin: ${exp.fechaFin}`, 10, y);
    });

    y += 20;
    doc.text('Educación:', 10, y);
    cvData.educacion.forEach((edu, index) => {
      y += 10;
      doc.text(`Institución: ${edu.institucion}`, 10, y);
      y += 10;
      doc.text(`Título: ${edu.titulo}`, 10, y);
      y += 10;
      doc.text(`Campo de estudio: ${edu.campoEstudio}`, 10, y);
      y += 10;
      doc.text(`Fecha de Inicio: ${edu.fechaInicio}`, 10, y);
      y += 10;
      doc.text(`Fecha de Fin: ${edu.fechaFin}`, 10, y);
    });

    y += 20;
    doc.text('Habilidades:', 10, y);
    cvData.habilidades.forEach((hab, index) => {
      y += 10;
      doc.text(`Habilidad: ${hab.nombre}`, 10, y);
      y += 10;
      doc.text(`Nivel: ${hab.nivel}`, 10, y);
    });

    y += 20;
    doc.text('Idiomas:', 10, y);
    cvData.idiomas.forEach((idioma, index) => {
      y += 10;
      doc.text(`Idioma: ${idioma.nombre}`, 10, y);
      y += 10;
      doc.text(`Nivel: ${idioma.nivel}`, 10, y);
    });

    y += 20;
    doc.text('Certificaciones:', 10, y);
    cvData.certificaciones.forEach((cert, index) => {
      y += 10;
      doc.text(`Certificación: ${cert.nombre}`, 10, y);
      y += 10;
      doc.text(`Institución: ${cert.institucion}`, 10, y);
      y += 10;
      doc.text(`Fecha de Obtención: ${cert.fechaObtencion}`, 10, y);
    });

    y += 20;
    doc.text('Publicaciones:', 10, y);
    cvData.publicaciones.forEach((pub, index) => {
      y += 10;
      doc.text(`Título: ${pub.titulo}`, 10, y);
      y += 10;
      doc.text(`Descripción: ${pub.descripcion}`, 10, y);
    });

    y += 20;
    doc.text('Referencias:', 10, y);
    cvData.referencias.forEach((ref, index) => {
      y += 10;
      doc.text(`Nombre: ${ref.nombre}`, 10, y);
      y += 10;
      doc.text(`Teléfono: ${ref.telefono}`, 10, y);
    });

    doc.save('cv.pdf');
  };

  if (!cvData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <Breadcrumbs currentPage="CV Guardado" />
        <h2>CV Guardado</h2>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Nombre completo</th>
              <td>{cvData.nombreCompleto}</td>
            </tr>
            <tr>
              <th>Correo electrónico</th>
              <td>{cvData.correoElectronico}</td>
            </tr>
            <tr>
              <th>Teléfono</th>
              <td>{cvData.telefono}</td>
            </tr>
            <tr>
              <th>Dirección</th>
              <td>{cvData.direccion}</td>
            </tr>
            <tr>
              <th>Nacionalidad</th>
              <td>{cvData.nacionalidad}</td>
            </tr>
            <tr>
              <th>LinkedIn</th>
              <td>{cvData.linkedin}</td>
            </tr>
            <tr>
              <th>Facebook</th>
              <td>{cvData.facebook}</td>
            </tr>
            <tr>
              <th>Instagram</th>
              <td>{cvData.instagram}</td>
            </tr>
            <tr>
              <th>Twitter</th>
              <td>{cvData.twitter}</td>
            </tr>
            <tr>
              <th>Resumen profesional</th>
              <td>{cvData.resumenProfesional}</td>
            </tr>
          </tbody>
        </table>

        <h4>Experiencia Laboral</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Institución/Empresa</th>
              <th>Puesto</th>
              <th>Descripción</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
            </tr>
          </thead>
          <tbody>
            {cvData.experienciaLaboral.map((exp, index) => (
              <tr key={index}>
                <td>{exp.institucion}</td>
                <td>{exp.puesto}</td>
                <td>{exp.descripcion}</td>
                <td>{exp.fechaInicio}</td>
                <td>{exp.fechaFin}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Educación</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Institución</th>
              <th>Título</th>
              <th>Campo de estudio</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
            </tr>
          </thead>
          <tbody>
            {cvData.educacion.map((edu, index) => (
              <tr key={index}>
                <td>{edu.institucion}</td>
                <td>{edu.titulo}</td>
                <td>{edu.campoEstudio}</td>
                <td>{edu.fechaInicio}</td>
                <td>{edu.fechaFin}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Habilidades</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Habilidad</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {cvData.habilidades.map((hab, index) => (
              <tr key={index}>
                <td>{hab.nombre}</td>
                <td>{hab.nivel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Idiomas</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Idioma</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {cvData.idiomas.map((idioma, index) => (
              <tr key={index}>
                <td>{idioma.nombre}</td>
                <td>{idioma.nivel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Certificaciones</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Certificación</th>
              <th>Institución</th>
              <th>Fecha de Obtención</th>
            </tr>
          </thead>
          <tbody>
            {cvData.certificaciones.map((cert, index) => (
              <tr key={index}>
                <td>{cert.nombre}</td>
                <td>{cert.institucion}</td>
                <td>{cert.fechaObtencion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Publicaciones</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {cvData.publicaciones.map((pub, index) => (
              <tr key={index}>
                <td>{pub.titulo}</td>
                <td>{pub.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Referencias</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {cvData.referencias.map((ref, index) => (
              <tr key={index}>
                <td>{ref.nombre}</td>
                <td>{ref.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
        <button className="btn btn-secondary" onClick={generatePDF}>
          Generar PDF
        </button>
      </div>
    </div>
  );
};

export default CVView;