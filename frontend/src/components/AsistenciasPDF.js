import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
});

const AsistenciasPDF = ({ asistencias }) => {
  const fecha = new Date().toLocaleDateString(); // Obtener la fecha actual

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Lista de Asistencias - {fecha}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Nombre</Text>
            <Text style={styles.tableCell}>Número de Control</Text>
            <Text style={styles.tableCell}>Asistencia</Text>
          </View>
          {asistencias.map((asistencia) => (
            <View style={styles.tableRow} key={asistencia._id}>
              <Text style={styles.tableCell}>{asistencia.alumnoId.nombre}</Text>
              <Text style={styles.tableCell}>{asistencia.alumnoId.numeroControl}</Text>
              <Text style={styles.tableCell}>{asistencia.asistio ? 'Asistió' : 'Faltó'}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default AsistenciasPDF;