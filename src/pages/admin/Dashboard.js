import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import config from '../../config';

function Dashboard() {
  const [error, setError] = useState(null);
  const [numusuarios, setNumusuarios] = useState([]);
  const [numretosactivos, setNumretosactivos] = useState([]);
  const [numretosinactivos, setNumretosinactivos] = useState([]);
  const [numrespuestasrecibidas, setNumrespuestasrecibidas] = useState([]);
  useEffect(() => {
    const obtenerNumUsuarios = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/dashboard/usuarios/count', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        setNumusuarios(data.totalUsers);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    const obtenerRetosActivos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/dashboard/retosactivos/count', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        setNumretosactivos(data.totalRetos);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    const obtenerRetosInactivos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/dashboard/retosinactivos/count', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        setNumretosinactivos(data.totalRetos);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    const obtenerRespuestasRecibidas = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await fetch(config.apiBaseUrl + '/api/dashboard/respuestas/count', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al obtener los retos resueltos');
        }

        setNumrespuestasrecibidas(data.totalRespuestas);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerNumUsuarios();
    obtenerRetosActivos();
    obtenerRetosInactivos();
    obtenerRespuestasRecibidas();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Dashboard</h1>
      <div className="stats-container">
        <div className="stat-item-text">Número de usuarios:</div>
        <div className="stat-item-number">{numusuarios}</div>

        <div className="stat-item-text">Número de retos activos:</div>
        <div className="stat-item-number">{numretosactivos}</div>

        <div className="stat-item-text">Número de retos NO activos:</div>
        <div className="stat-item-number">{numretosinactivos}</div>

        <div className="stat-item-text">Respuestas recibidas:</div>
        <div className="stat-item-number">{numrespuestasrecibidas}</div>

        <div className="stat-item-text">Usuario con mayor número de aciertos:</div>
        <div className="stat-item-number">0</div>
      </div>
      <div className="button-links">
        <a href="/reto" className="button-link">Agregar reto</a>
        <a href="/RetosActivos" className="button-link">Retos activos</a>
        <a href="/RetosInactivos" className="button-link">Retos Inactivos</a>
      </div>
    </div>
  );
}

export default Dashboard;
