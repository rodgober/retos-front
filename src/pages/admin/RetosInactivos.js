import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

const RetosInactivos = () => {
    const [error, setError] = useState(null);
    const [retosInactivos, setretosInactivos] = useState([]);

useEffect(() => {

    const obtenerRetosInactivos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/reto/inactivos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        setretosInactivos(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    obtenerRetosInactivos();
  }, []);


    return ( 
      <div className="container">
          <div className='list-container'>
              <h2>Retos Inactivos</h2>
              {error && <p>{error}</p>}
              <div class="link-list">
                  {retosInactivos.map((reto) => (
                      <a href={`/editar/${reto._id}`} class="list-link">Editar {reto.nombre}</a>
                  ))}
              </div>
          </div>
      </div>
     );
}
 
export default RetosInactivos;