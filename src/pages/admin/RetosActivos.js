import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RetosActivos.css';
import config from '../../config';

const RetosActivos = () => {
    const [error, setError] = useState(null);
    const [retosActivos, setretosActivos] = useState([]);

useEffect(() => {

    const obtenerRetosActivos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/reto/activos', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        setretosActivos(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerRetosActivos();
    console.log(retosActivos);
  }, []);


    return ( 
        <div className="container">
            <div className='list-container'>
                <h2>Retos activos</h2>
                {error && <p>{error}</p>}
                <div class="link-list">
                    {retosActivos.map((reto) => (
                        <a href={`/editar/${reto._id}`} class="list-link">Editar {reto.nombre} Nivel: {reto.nivel}</a>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default RetosActivos;
