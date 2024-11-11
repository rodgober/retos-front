import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListarRetos.css';
import config from '../../config';

const ListarRetos = () => {
    const [retos, setRetos] = useState([]);
    const [retosResueltos, setretosResueltos] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const obtenerRetos = async () => {
        try {
          const token = localStorage.getItem('token'); // Obtener token JWT
          const response = await fetch(config.apiBaseUrl + '/api/reto/listar', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Enviar token en la cabecera
            },
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los detalles del reto');
          }
          setRetos(data);
        } catch (error) {
          setError(error.message);
        }
      };
      const obtenerRetosResueltos = async () => {
        try {
          const token = localStorage.getItem('token'); // Obtener token JWT
          const response = await fetch(config.apiBaseUrl + '/api/reto/resueltos', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los retos resueltos');
          }
  
          setretosResueltos(data);
        } catch (error) {
          setError(error.message);
        }
      };
      obtenerRetos();
      obtenerRetosResueltos();
    }, []);
  
    return (
      <div className="container">
        <h1>Retos pendientes</h1>
        {error && <p>{error}</p>}
        <div className="resolved-challenges">
            {retos.map((reto) => (
              <a href={`/reto/${reto._id}`} className="challenge-card">
                <h3 className="challenge-title">{reto.nombre}</h3>
              </a>
            ))}
        </div>

        <h1>Retos resueltos</h1>
        <div className="resolved-challenges">
          {error && <p>{error}</p>}
            {retosResueltos.map((reto) => (
              <a href={`/reto/${reto.reto_id}`} className="challenge-card">
                <h3 className="challenge-title">{reto.nombre}</h3>
                <p className="challenge-date">Resuelto el: {new Date(reto.fecha_respuesta).toLocaleDateString()}</p>
              </a>
            ))}
        </div>
      </div>
    );
}
 
export default ListarRetos;