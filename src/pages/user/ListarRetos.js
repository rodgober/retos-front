import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <div>
        <h1>Retos pendientes</h1>
        {error && <p>{error}</p>}
        <ul>
          {retos.map((reto) => (
            <li key={reto._id}>
              <Link to={`/reto/${reto._id}`}>Ver Reto {reto.nombre}</Link>
            </li>
          ))}
        </ul>
        <h1>Retos resueltos</h1>
        {error && <p>{error}</p>}
        <ul>
          {retosResueltos.map((reto) => (
            <li key={reto._id}>
              <Link to={`/reto/${reto.reto_id}`}>Ver Reto {reto.nombre}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
}
 
export default ListarRetos;