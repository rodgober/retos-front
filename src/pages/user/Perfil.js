import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Perfil.css';
import config from '../../config';

const Perfil = () => {
  const [retosResueltos, setRetosResueltos] = useState([]);
  const [retos, setRetos] = useState([]);
  const [error, setError] = useState(null);
  const [perfil, setPerfil] = useState([]);
  const [totalRetos, settotalRetos] = useState(0);
  
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

        setRetosResueltos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    const obtenerPerfil = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/perfil', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        setPerfil(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const obtenerTotalRetos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/reto/retosactivos/count', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        settotalRetos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerRetos();
    obtenerRetosResueltos();
    obtenerPerfil();
    obtenerTotalRetos();
  }, []);

  return (
    <div className="container">
            <h2>{perfil.name} {perfil.lastName}</h2>
            <h2>Nivel: {~~(retosResueltos.length / 3)}</h2>
            <h3>Retos resueltos: {retosResueltos.length} de {totalRetos.totalRetos} totales.</h3>
            <hr></hr>
            <h2>Retos por resolver</h2>
              <div className="resolved-challenges">
              {retos.map((reto, index) => (
                  <a href={`/reto/${reto._id}`} className="challenge-card">
                      <h3 className="challenge-title">{reto.nombre}</h3>
                  </a>
              ))}
            </div>
            <hr></hr>
            <h2>Retos resueltos</h2>
              <div className="resolved-challenges">
              {retosResueltos.map((reto, index) => (
                  <a href={`/reto/${reto.reto_id}`} className="challenge-card">
                      <h3 className="challenge-title">{reto.nombre}</h3>
                      <p className="challenge-date">Resuelto el: {new Date(reto.fecha_respuesta).toLocaleDateString()}</p>
                  </a>
              ))}
            </div>
    </div>

  );
};

export default Perfil;





    


