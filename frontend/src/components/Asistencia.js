import React, { useState, useEffect } from 'react';
import { obtenerAlumnos, obtenerAsistencias, guardarAsistencia, obtenerGrupos } from '../services/api';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Importar PDFDownloadLink
import ListaAsistenciasPDF from './ListaAsistenciasPDF'; // Importar el componente PDF
import ModalNotificacion from './ModalNotificacion';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';

const Asistencia = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState('');
  const [modalTipo, setModalTipo] = useState('success');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gruposData = await obtenerGrupos();
        setGrupos(gruposData);

        const alumnosData = await obtenerAlumnos();
        setAlumnos(alumnosData);

        const asistenciasData = await obtenerAsistencias();
        const asistenciasArray = alumnosData.map((alumno) => {
          const asistencia = asistenciasData.find((a) => a.alumnoId._id === alumno._id);
          return {
            alumnoId: alumno._id,
            asistio: asistencia ? asistencia.asistio : false,
          };
        });
        setAsistencias(asistenciasArray);
      } catch (err) {
        mostrarModal(err.message || 'Error al cargar los datos', 'danger');
      }
    };
    fetchData();
  }, []);

  const mostrarModal = (mensaje, tipo = 'success') => {
    setModalMensaje(mensaje);
    setModalTipo(tipo);
    setShowModal(true);
  };

  const handleAsistenciaChange = (alumnoId, asistio) => {
    setAsistencias((prev) =>
      prev.map((asistencia) =>
        asistencia.alumnoId === alumnoId ? { ...asistencia, asistio } : asistencia
      )
    );
  };

  const handleGuardarAsistencia = async () => {
    try {
      const asistenciasObj = asistencias.reduce((acc, asistencia) => {
        acc[asistencia.alumnoId] = asistencia.asistio;
        return acc;
      }, {});
      await guardarAsistencia(asistenciasObj);
      mostrarModal('Asistencia guardada exitosamente');
    } catch (err) {
      mostrarModal(err.message || 'Error al guardar la asistencia', 'danger');
    }
  };

  const alumnosFiltrados = grupoSeleccionado
    ? alumnos.filter((alumno) => alumno.grupoId?._id === grupoSeleccionado)
    : [];

  const grupoNombre = grupos.find((grupo) => grupo._id === grupoSeleccionado)?.nombre || 'Sin grupo';

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Breadcrumbs />
        <h2>Asistencia</h2>

        <div className="mb-3">
          <label htmlFor="grupo" className="form-label">
            Seleccionar grupo:
          </label>
          <select
            id="grupo"
            className="form-select"
            value={grupoSeleccionado}
            onChange={(e) => setGrupoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un grupo</option>
            {grupos.map((grupo) => (
              <option key={grupo._id} value={grupo._id}>
                {grupo.nombre}
              </option>
            ))}
          </select>
        </div>

        {grupoSeleccionado && (
          <div className="mb-4">
            <h3>Alumnos del grupo seleccionado</h3>
            <ul className="list-group">
              {alumnosFiltrados.map((alumno) => {
                const asistencia = asistencias.find((a) => a.alumnoId === alumno._id) || { asistio: false };
                return (
                  <li key={alumno._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      {alumno.nombre} - <strong>Número de control:</strong> {alumno.numeroControl}
                    </div>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          border: '1px solid #000',
                          textAlign: 'center',
                          lineHeight: '20px',
                          marginRight: '10px',
                          backgroundColor: asistencia.asistio ? '#28a745' : '#fff',
                          color: asistencia.asistio ? '#fff' : '#000',
                        }}
                      >
                        {asistencia.asistio ? 'X' : ''}
                      </span>
                      <label>
                        <input
                          type="checkbox"
                          checked={asistencia.asistio}
                          onChange={(e) => handleAsistenciaChange(alumno._id, e.target.checked)}
                        />
                        Asistió
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={handleGuardarAsistencia}>
            Guardar Asistencia
          </button>

          {/* Botón para descargar la lista en PDF */}
          <PDFDownloadLink
            document={
              <ListaAsistenciasPDF
                alumnos={alumnosFiltrados}
                asistencias={asistencias}
                grupoNombre={grupoNombre}
              />
            }
            fileName={`asistencias_${grupoNombre}.pdf`}
          >
            {({ loading }) => (
              <button className="btn btn-success" disabled={loading}>
                {loading ? 'Generando PDF...' : 'Descargar Lista'}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        <ModalNotificacion
          show={showModal}
          onClose={() => setShowModal(false)}
          mensaje={modalMensaje}
          tipo={modalTipo}
        />
      </div>
    </div>
  );
};

export default Asistencia;