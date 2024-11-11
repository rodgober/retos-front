import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';
import ConfettiAnimation from './../../components/ConfettiAnimation';
import './DetalleReto.css';


const DetalleReto = () => {
  const { id } = useParams(); // Obtén el ID de la URL
  const [reto, setReto] = useState(null);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [nombre, setNombre] = useState('');
  const [resuelto, setResuelto] = useState(false);
  const [retoResuelto, setRetoResuelto] = useState(null);
  const [fechaFormateada, setFechaFormateada] = useState('');
  const [respuestaRecibida, setRespuestaRecibida] = useState('');
  const [excesointentos, setExcesointentos] = useState(false);
  const [numintento, setNumintento] = useState(0);
  const [respuestaCorrecta, setrespuestaCorrecta] = useState(false);

      //Trae todos los detalles del reto y los guarda en reto
      const fetchReto = async () => {
        try {
          const token = localStorage.getItem('token'); // Obtener token JWT
          const response = await fetch(config.apiBaseUrl + '/api/reto/' + id, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Enviar token en la cabecera
            },
          });
  
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Error al obtener los detalles del reto');
          }
          setReto(data);
          setNombre(data.nombre);
        } catch (error) {
          setError(error.message);
        }
      };
  
      //Revisa si ya está contestado, si està muestra el razonamiento, en otro caso muestra las opciones para contestarlo
      const fetchRazonamiento = async () => {
        try {
          const token = localStorage.getItem('token'); // Obtener token JWT
          const response = await axios.get(config.apiBaseUrl + '/api/reto/' + id + '/resuelto', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setResuelto(response.status === 200);
          setRetoResuelto(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };

  useEffect(() => {
    fetchReto();
    fetchRazonamiento();
  }, [id]);

  useEffect(() => {
    if(resuelto){
      const fecha = new Date(retoResuelto.fecha_respuesta);
          // Obtener el día, mes y año
      const dia = String(fecha.getDate()).padStart(2, '0'); // Añadir 0 si es necesario
      const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0, por eso sumamos 1
      const anio = fecha.getFullYear();
          // Formatear como dd/mm/aaaa
      setFechaFormateada(`${dia}/${mes}/${anio}`);
      switch (retoResuelto.tipo) {
        case 'booleano':
          return ((retoResuelto.respuesta === 'true')?setRespuestaRecibida('Verdadero'):setRespuestaRecibida('Falso'));
        case 'multiple':
          const letras = ['A', 'B', 'C', 'D'];
          return setRespuestaRecibida(letras[retoResuelto.respuesta - 1]);
        default:
          return setRespuestaRecibida(retoResuelto.respuesta);
      }
    }

  }, [retoResuelto])

  useEffect(() => {

    const fetchIntentos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token JWT
        const response = await axios.get(config.apiBaseUrl + '/api/reto/' + id + '/intentos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const intentos = response.data;
        const haceUnaHora = new Date(Date.now() - 60 * 60 * 1000);

                // Filtrar los intentos en la última hora
        const intentosEnUltimaHora = intentos.filter(intent => 
          new Date(intent.fecha_respuesta) >= haceUnaHora
        );
        if (intentosEnUltimaHora.length > 4) {
          setExcesointentos(true)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchIntentos();
  }, [numintento])


  

  //Envia la respuesta del usuario, para contestar el reto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!excesointentos) {
      try {
        const token = localStorage.getItem('token'); // Token JWT almacenado
        const { data } = await axios.post(config.apiBaseUrl + '/api/reto/' + id + '/responder', { respuesta, nombre },{headers: {Authorization: `Bearer ${token}`,},
        });
        if(data.correcto){
          try {
            const token = localStorage.getItem('token'); // Obtener token JWT
            const response = await axios.get(config.apiBaseUrl + '/api/reto/' + id + '/resuelto', {
              headers: { Authorization: `Bearer ${token}` }
            });
            setResuelto(response.status === 200);
            setRetoResuelto(response.data);

            setrespuestaCorrecta(true);
            setTimeout(() => setrespuestaCorrecta(false), 4000); // Desactiva la animación después de 2 segundos
          } catch (error) {
            console.log(error.message);
          }
        }
        setMensaje(data.message);
        setResuelto(data.correcto);
      } catch (error) {
        setMensaje('Error al enviar la respuesta');
      }
      setNumintento(prevNumintento => prevNumintento + 1);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!reto) {
    return <p>Cargando los detalles del reto...</p>;
  }

  return (
    <div className="container">
      <div className='reto-container'>
        <a href={`/perfil`} >
                  <h4 >Regresar a los retos</h4>
        </a>
        <h2>{reto.nombre}</h2>
        {/*
        <h2>-Tema: {reto.tema}</h2>
        <h4>-Subtema: {reto.subtema}</h4>
        */}
        {reto.pregunta && <img src={reto.pregunta} alt="Imagen del Reto" />}
        {respuestaCorrecta && <ConfettiAnimation />}
        {reto?.tipo === 'multiple' && (reto?.opciones && reto?.opciones.trim() !== "") && (
            <img src={reto.opciones} alt="Imagen de las opciones" />)}
      
        {resuelto ? <div><img src={retoResuelto.razonamiento} alt="Imagen del razonamiento" /> </div> : 
        <form className="reto-form" onSubmit={handleSubmit}>
          {reto?.tipo === 'multiple' && (
              <select value={respuesta} onChange={(e) => setRespuesta(e.target.value)}>
                <option value="">Seleccione una opción</option>
                <option value="1">A</option>
                <option value="2">B</option>
                <option value="3">C</option>
                <option value="4">D</option>
              </select>
          )}

          {reto?.tipo === 'booleano' && (
            <select value={respuesta} onChange={(e) => setRespuesta(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="true">Verdadero</option>
              <option value="false">Falso</option>
            </select>
          )}

          {(reto?.tipo === 'abierto' || reto?.tipo === 'numerico') && (
            <input
              type="text"
              placeholder="Escribe tu respuesta"
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
            />
          )}
          
          <button 
            type="submit" 
            className={`reto-button ${excesointentos ? 'hide' : ''}`}
          >
            Enviar respuesta
        </button>
        <p>{mensaje}</p>
        {excesointentos ? <p>Haz excedido el número de intentos en la última hora, te recomiendo que revises muy bien el reto y vuelvas mas tarde</p>: null}
        </form>
        }
        {retoResuelto ? <div>
                            <p>Respuesta recibida: {respuestaRecibida}</p>
                            <p>Fecha de recepción de respuesta: {fechaFormateada}</p>
                        </div> 
                      : <div>{fechaFormateada}</div>}
      </div>
    </div>
  );
};

export default DetalleReto;
