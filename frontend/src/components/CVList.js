import React, { useEffect, useState } from 'react';
import { getAllCVs } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Navbar from './Navbar';

const CVList = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        console.log('Fetching CVs...');
        const data = await getAllCVs();
        console.log('CVs fetched:', data);
        setCvs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching CVs:', error);
        setError('Error al cargar los CVs');
      } finally {
        setLoading(false);
        console.log('Fetch CVs complete');
      }
    };
    fetchCVs();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <Breadcrumbs currentPage="Lista de CVs" />
        <h2>Lista de CVs</h2>
        {cvs.length === 0 ? (
          <p>No hay CVs disponibles</p>
        ) : (
          <ul className="list-group">
            {cvs.map((cv) => (
              <li key={cv._id} className="list-group-item">
                <h5>{cv.nombreCompleto}</h5>
                <p>{cv.correoElectronico}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/cv/view/${cv.correoElectronico}`)}
                >
                  Ver CV
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CVList;