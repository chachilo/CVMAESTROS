const Asistencia = require('../models/Asistencia');
const Alumno = require('../models/Alumno');

exports.guardarAsistencia = async (req, res) => {
  try {
    const { asistencias } = req.body;
    console.log('Asistencias recibidas:', asistencias); // Log para depuración

    const fecha = new Date(); // Fecha actual
    fecha.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00

    const asistenciasArray = Object.keys(asistencias).map((alumnoId) => ({
      alumnoId,
      asistio: asistencias[alumnoId],
      fecha, // Agregar la fecha
    }));

    console.log('Asistencias a guardar:', asistenciasArray); // Log para depuración

    // Verificar y actualizar o crear asistencias
    const asistenciasGuardadas = await Promise.all(
      asistenciasArray.map(async (asistencia) => {
        // Buscar si ya existe una asistencia para este alumno en la fecha actual
        const asistenciaExistente = await Asistencia.findOne({
          alumnoId: asistencia.alumnoId,
          fecha: {
            $gte: fecha, // Mayor o igual a la fecha de inicio del día
            $lt: new Date(fecha.getTime() + 24 * 60 * 60 * 1000), // Menor que la fecha de fin del día
          },
        });

        if (asistenciaExistente) {
          // Si existe, actualizar la asistencia
          asistenciaExistente.asistio = asistencia.asistio;
          console.log('Actualizando asistencia:', asistenciaExistente); // Log para depuración
          return await asistenciaExistente.save();
        } else {
          // Si no existe, crear una nueva asistencia
          console.log('Creando nueva asistencia:', asistencia); // Log para depuración
          return await Asistencia.create(asistencia);
        }
      })
    );

    res.status(200).json(asistenciasGuardadas);
  } catch (error) {
    console.error('Error al guardar asistencias:', error); // Log para depuración
    res.status(500).json({ message: error.message });
  }
};

exports.obtenerAsistencias = async (req, res) => {
  try {
    const fechaHoy = new Date(); // Fecha actual
    fechaHoy.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00

    const asistencias = await Asistencia.find({
      fecha: {
        $gte: fechaHoy, // Mayor o igual a la fecha de hoy
        $lt: new Date(fechaHoy.getTime() + 24 * 60 * 60 * 1000), // Menor que la fecha de mañana
      },
    }).populate('alumnoId', 'nombre numeroControl');

    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
