import React, { useState } from 'react';
import { saveCV } from '../services/api';

const CVForm = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    telefono: '',
    direccion: '',
    nacionalidad: '',
    linkedin: '',
    resumenProfesional: '',
    experienciaLaboral: [],
    educacion: [],
    habilidades: [],
    idiomas: [],
    certificaciones: [],
    publicaciones: [],
    referencias: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({
      ...formData,
      [section]: updatedSection,
    });
  };

  const addSectionEntry = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], {}],
    });
  };

  const removeSectionEntry = (section, index) => {
    const updatedSection = formData[section].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [section]: updatedSection,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCV(formData);
      alert('CV guardado exitosamente');
      setFormData({
        nombreCompleto: '',
        correoElectronico: '',
        telefono: '',
        direccion: '',
        nacionalidad: '',
        linkedin: '',
        resumenProfesional: '',
        experienciaLaboral: [],
        educacion: [],
        habilidades: [],
        idiomas: [],
        certificaciones: [],
        publicaciones: [],
        referencias: [],
      });
    } catch (error) {
      console.error('Error al guardar el CV:', error);
      alert('Hubo un error al guardar el CV. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Formulario de CV</h2>
      <form onSubmit={handleSubmit}>
        {/* Información Básica */}
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            name="nombreCompleto"
            className="form-control"
            placeholder="Nombre completo"
            onChange={handleChange}
            value={formData.nombreCompleto}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="correoElectronico"
            className="form-control"
            placeholder="Correo electrónico"
            onChange={handleChange}
            value={formData.correoElectronico}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono de contacto</label>
          <input
            type="tel"
            name="telefono"
            className="form-control"
            placeholder="Teléfono de contacto"
            onChange={handleChange}
            value={formData.telefono}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección (opcional)</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            placeholder="Dirección"
            onChange={handleChange}
            value={formData.direccion}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nacionalidad</label>
          <input
            type="text"
            name="nacionalidad"
            className="form-control"
            placeholder="Nacionalidad"
            onChange={handleChange}
            value={formData.nacionalidad}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enlace a LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            className="form-control"
            placeholder="Enlace a LinkedIn"
            onChange={handleChange}
            value={formData.linkedin}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Resumen profesional</label>
          <textarea
            name="resumenProfesional"
            className="form-control"
            placeholder="Resumen profesional"
            onChange={handleChange}
            value={formData.resumenProfesional}
            rows="4"
            required
          />
        </div>

        {/* Experiencia Laboral */}
        <div className="mb-3">
          <h4>Experiencia Laboral</h4>
          {formData.experienciaLaboral.map((exp, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Institución/Empresa"
                value={exp.institucion || ''}
                onChange={(e) => handleArrayChange('experienciaLaboral', index, 'institucion', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Puesto"
                value={exp.puesto || ''}
                onChange={(e) => handleArrayChange('experienciaLaboral', index, 'puesto', e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Descripción"
                value={exp.descripcion || ''}
                onChange={(e) => handleArrayChange('experienciaLaboral', index, 'descripcion', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSectionEntry('experienciaLaboral', index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addSectionEntry('experienciaLaboral')}
          >
            Agregar Experiencia
          </button>
        </div>

        {/* Educación */}
        <div className="mb-3">
          <h4>Educación</h4>
          {formData.educacion.map((edu, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Institución"
                value={edu.institucion || ''}
                onChange={(e) => handleArrayChange('educacion', index, 'institucion', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Título"
                value={edu.titulo || ''}
                onChange={(e) => handleArrayChange('educacion', index, 'titulo', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Campo de estudio"
                value={edu.campoEstudio || ''}
                onChange={(e) => handleArrayChange('educacion', index, 'campoEstudio', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSectionEntry('educacion', index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addSectionEntry('educacion')}
          >
            Agregar Educación
          </button>
        </div>

        {/* Habilidades */}
        <div className="mb-3">
          <h4>Habilidades</h4>
          {formData.habilidades.map((hab, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Habilidad"
                value={hab.nombre || ''}
                onChange={(e) => handleArrayChange('habilidades', index, 'nombre', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSectionEntry('habilidades', index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addSectionEntry('habilidades')}
          >
            Agregar Habilidad
          </button>
        </div>

        {/* Idiomas */}
        <div className="mb-3">
          <h4>Idiomas</h4>
          {formData.idiomas.map((idioma, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Idioma"
                value={idioma.nombre || ''}
                onChange={(e) => handleArrayChange('idiomas', index, 'nombre', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSectionEntry('idiomas', index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addSectionEntry('idiomas')}
          >
            Agregar Idioma
          </button>
        </div>

        {/* Certificaciones */}
        <div className="mb-3">
          <h4>Certificaciones</h4>
          {formData.certificaciones.map((cert, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Certificación"
                value={cert.nombre || ''}
                onChange={(e) => handleArrayChange('certificaciones', index, 'nombre', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSectionEntry('certificaciones', index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addSectionEntry('certificaciones')}
          >
            Agregar Certificación
          </button>
        </div>

        {/* Publicaciones */}
        <div className="mb-3">
          <h4>Publicaciones</h4>
          {formData.publicaciones.map((pub, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Título de la publicación"
                value={pub.titulo || ''}
                onChange={(e) => handleArrayChange('publicaciones', index, 'titulo', e.target.value)}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Descripción"
                value={pub.descripcion || ''}
                onChange={(e) => handleArrayChange('publicaciones', index, 'descripcion', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSectionEntry('publicaciones', index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addSectionEntry('publicaciones')}
          >
            Agregar Publicación
          </button>
        </div>

        {/* Referencias */}
        <div className="mb-3">
          <h4>Referencias</h4>
          {formData.referencias.map((ref, index) => (
            <div key={index} className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nombre de la referencia"
                value={ref.nombre || ''}
                onChange={(e) => handleArrayChange('referencias', index, 'nombre', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Teléfono"
                value={ref.telefono || ''}
                onChange={(e) => handleArrayChange('referencias', index, 'telefono', e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeSectionEntry('referencias', index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => addSectionEntry('referencias')}
          >
            Agregar Referencia
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar CV
        </button>
      </form>
    </div>
  );
};

export default CVForm;