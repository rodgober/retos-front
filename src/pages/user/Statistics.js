import React, { useState, useEffect } from 'react';
import config from '../../config';
import './Statistics.css';

function Statistics() {
  const [error, setError] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  
useEffect(() => {
  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener token JWT
      const response = await fetch(config.apiBaseUrl + '/api/dashboard/usuarios/top', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Enviar token en la cabecera
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener los detalles del reto');
      }
      setUsuarios(data.usuariosOrdenados);
    } catch (error) {
      setError(error.message);
    }
  };
  fetchUsuarios();
}, []);

  return (
      <div className="statistics-container">
        <h2>Clasificación general</h2>
        <table className="ranking-table">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Nombre</th>
                        <th>Puntos</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.slice(0, 10).map((usuario, index) => (
                        <tr key={usuario._id} className={`rank-${index + 1}`}>
                            <td className="position">
                              <span className={`medal-${index + 1}`}></span>
                              <span className={`not-medal-${index + 1}`}>{index + 1}</span>
                            </td>
                            <td>{usuario.name} {usuario.lastName}</td>
                            <td className="points">{usuario.totalRespuestas}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
  );
}

export default Statistics;