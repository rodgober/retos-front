import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';

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

  useEffect(() => {
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

      switch (reto.tipo) {
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
  

  //Envia la respuesta del usuario, para contestar el reto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Token JWT almacenado
      const { data } = await axios.post(config.apiBaseUrl + '/api/reto/' + id + '/responder', { respuesta, nombre },{headers: {Authorization: `Bearer ${token}`,},
      });
      setMensaje(data.message);
      setResuelto(data.correcto);
    } catch (error) {
      console.error('Error al enviar la respuesta', error);
      setMensaje('Error al enviar la respuesta');
    } 
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!reto) {
    return <p>Cargando los detalles del reto...</p>;
  }

  return (
    <div>
      <h2>Nombre del Reto {reto.nombre}</h2>
      <h2>-Tema: {reto.tema}</h2>
      <h4>-Subtema: {reto.subtema}</h4>
      {reto.pregunta && <img src={reto.pregunta} alt="Imagen del Reto" />}
      {reto.tipo === 'multiple' && (reto.opciones != null ) && (
            <img src={reto.opciones} alt="Imagen de las opciones" />
        )}
    {/*  {resuelto ? <div>si está resuelto</div> : <div>NO Esta resuelto</div>} */ }
      {resuelto ? <div><img src={reto.razonamiento} alt="Imagen del razonamiento" /> </div> : 
      <form onSubmit={handleSubmit}>
        {reto.tipo === 'multiple' && (
            <select value={respuesta} onChange={(e) => setRespuesta(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
              <option value="4">D</option>
            </select>
        )}

        {reto.tipo === 'booleano' && (
          <select value={respuesta} onChange={(e) => setRespuesta(e.target.value)}>
            <option value="">Seleccione una opción</option>
            <option value="true">Verdadero</option>
            <option value="false">Falso</option>
          </select>
        )}

        {(reto.tipo === 'abierto' || reto.tipo === 'numerico') && (
          <input
            type="text"
            placeholder="Tu respuesta"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
          />
        )}

        <button type="submit">Enviar respuesta</button>
      </form>
      }
      {retoResuelto ? <div><p>Fecha de recepción de respuesta: {fechaFormateada}</p>
                          <p>Respuesta recibida: {respuestaRecibida}</p></div> 
                          : <div>{fechaFormateada}</div>}

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default DetalleReto;
