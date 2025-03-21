import React, { useState, useEffect } from 'react';
import { obtenerAsistenciasPorFecha } from '../services/api';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AsistenciasPDF from './AsistenciasPDF';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';

const ListaAsistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const asistenciasData = await obtenerAsistenciasPorFecha(fecha);
        // Filtrar asistencias duplicadas
        const asistenciasUnicas = asistenciasData.filter((asistencia, index, self) =>
          index === self.findIndex((a) => a.alumnoId._id === asistencia.alumnoId._id)
        );
        setAsistencias(asistenciasUnicas);
      } catch (err) {
        console.error('Error al cargar las asistencias:', err);
      }
    };
    fetchAsistencias();
  }, [fecha]);

  const asistenciasAgrupadas = asistencias.reduce((acc, asistencia) => {
    const grupoNombre = asistencia.alumnoId.grupoId?.nombre || 'Sin grupo';
    if (!acc[grupoNombre]) {
      acc[grupoNombre] = [];
    }
    acc[grupoNombre].push(asistencia);
    return acc;
  }, {});

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Breadcrumbs />
        <h2>Lista de Asistencias</h2>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Seleccionar fecha:
          </label>
          <input
            type="date"
            id="fecha"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        {Object.entries(asistenciasAgrupadas).map(([grupoNombre, asistencias]) => (
          <div key={grupoNombre} className="mb-4">
            <h3>{grupoNombre}</h3>
            <ul className="list-group">
              {asistencias.map((asistencia) => (
                <li key={asistencia._id} className="list-group-item">
                  <strong>{asistencia.alumnoId.nombre}</strong> - {asistencia.alumnoId.numeroControl} -{' '}
                  {asistencia.asistio ? 'Asistió' : 'Faltó'}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mt-3">
          <PDFDownloadLink
            document={<AsistenciasPDF asistencias={asistencias} fecha={fecha} />}
            fileName={`asistencias_${fecha}.pdf`}
          >
            {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ListaAsistencias;