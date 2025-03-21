import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    padding: 5,
  },
  cell: {
    flex: 1,
    fontSize: 10,
  },
});

// Función para formatear la fecha actual
const obtenerFechaActual = () => {
  const fecha = new Date();
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

// Componente para generar el PDF
const ListaAsistenciasPDF = ({ alumnos, asistencias, grupoNombre }) => {
  const fechaActual = obtenerFechaActual(); // Obtener la fecha actual

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Lista de Asistencias - {grupoNombre}</Text>
          <Text style={styles.subheader}>Fecha de asistencia: {fechaActual}</Text> {/* Mostrar la fecha actual */}
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell}>Nombre</Text>
              <Text style={styles.cell}>Número de Control</Text>
              <Text style={styles.cell}>Asistencia</Text>
            </View>
            {alumnos.map((alumno) => {
              const asistencia = asistencias.find((a) => a.alumnoId === alumno._id) || { asistio: false };
              return (
                <View key={alumno._id} style={styles.row}>
                  <Text style={styles.cell}>{alumno.nombre}</Text>
                  <Text style={styles.cell}>{alumno.numeroControl}</Text>
                  <Text style={styles.cell}>{asistencia.asistio ? 'Asistió' : 'Faltó'}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ListaAsistenciasPDF;