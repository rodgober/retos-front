import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import config from '../../config';
import './EditarReto.css';

const EditarReto = () => {

    const { id } = useParams();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [reto, setReto] = useState(null);
    const [tema, setTema] = useState(null);
    const [subtema, setSubtema] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [activo, setActivo] = useState(null);
    const [pregunta, setPregunta] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [opciones, setOpciones] = useState(null);
    const [respuesta, setRespuesta] = useState(null);
    const [razonamiento, setRazonamiento] = useState(null);
    const [nivel, setNivel] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {

        const fetchReto = async () => {
          try {
            const token = localStorage.getItem('token'); // Obtener token JWT
            const response = await axios.get(config.apiBaseUrl + '/api/dashboard/reto/' + id, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const reto = response.data;
            setReto(reto);
            setTema(response.data.tema);
            setSubtema(response.data.subtema);
            setNombre(response.data.nombre);
            setActivo(response.data.activo);
            setPregunta(response.data.pregunta);
            setTipo(response.data.tipo);
            setOpciones(response.data.opciones)
            setRespuesta(response.data.respuesta);
            setRazonamiento(response.data.razonamiento);
            setNivel(response.data.nivel);        
          } catch (error) {
            console.log(error.message);
          }
        };
        fetchReto();
      }, [])

        // Manejar la carga de la imagen de la pregunta
  const handleImageChangePre = (e) => {
    const file = e.target.files[0]; // Obtener el archivo
    if (file) {
      setPregunta(file); // Guardar el archivo seleccionado en el estado
    }
  };
  // Manejar la carda de la imagen de las opciones multiples
  const handleImageChangeOM = (e) => {
    const file = e.target.files[0]; // Obtener el archivo
    if (file) {
      setOpciones(file); // Guardar el archivo seleccionado en el estado
    }
  };

    // Manejar la carga de la imagen del razonamiento
    const handleImageChangeRaz = (e) => {
      const file = e.target.files[0]; // Obtener el archivo
      if (file) {
        setRazonamiento(file); // Guardar el archivo seleccionado en el estado
      }
    };

// Manejar el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pregunta) {
      setMessage('Por favor selecciona una pregunta');
      return;
    }

    if (!razonamiento) {
      setMessage('Por favor selecciona un razonamiento');
      return;
    }

    // Estructura de datos a enviar
     // Crear un FormData para enviar los datos junto con la imagen
     setRespuesta([0,0]);
    const formData = new FormData();
    formData.append('tema', tema);
    formData.append('subtema', subtema);
    formData.append('nombre', nombre); // Agregar la imagen al FormData
    formData.append('tipo', tipo);
    formData.append('activo', activo);
    formData.append('opciones', opciones);
    formData.append('respuesta', respuesta);
    formData.append('pregunta', pregunta); // Agregar la imagen al FormData
    formData.append('razonamiento', razonamiento); // Agregar la imagen al FormData
    formData.append('nivel', nivel);

    try {
      const token = localStorage.getItem('token'); // Token JWT almacenado
      const res = await axios.put(config.apiBaseUrl + '/api/reto/editar/'+ id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Indicar que se está enviando un archivo
          Authorization: `Bearer ${token}`, // Incluye el token de autenticación
        },
      });
      setMessage('Reto actualizado con éxito');
      alert('Reto actualizado con éxito');
      navigate('/dashboard'); // Redirigir al Dashboard después de agregar el reto
    } catch (error) {
      setMessage('Error al actualizar el reto');
    }

  };

    return ( 
        <div className="container">
            <div className='form-container'>
                <h2>Editar reto</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form className="challenge-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tema:</label>
                        <input
                            type="text"
                            value={tema}
                            onChange={(e) => setTema(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Subtema:</label>
                        <input
                            type="text"
                            value={subtema}
                            onChange={(e) => setSubtema(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Nombre o descripción pequeña:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Pregunta:</label>
                        <img src={pregunta} alt="Imagen del Reto" />
                        <input type="file" onChange={handleImageChangePre} accept="image/*" />
                    </div>
                    <div className="form-group">
                        <label>Tipo de Reto:</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="">Seleccione un tipo</option>
                            <option value="abierto">Respuesta abierta</option>
                            <option value="multiple">Opción múltiple</option>
                            <option value="booleano">Booleano</option>
                            <option value="numerico">Rango numérico</option>
                        </select>
                    </div>


            {/* Mostrar campos dependiendo del tipo de reto */}
                {tipo === 'abierto' && (
                    <div className="form-group">
                        <label htmlFor="respuestaAbierta">Respuesta Abierta:</label>
                        <input
                            type="text"
                            id="respuesta"
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                        />
                    </div>
                )}


                {tipo === 'multiple' && (
                    <div>
                        <div className="form-group">
                            <label>Selecciona la imagen que contiene las opciones (opcional):</label>
                            {opciones ?(<img src={opciones} alt="Imagen del Reto" />) : <div>No tiene archivo de opciones</div>}
                            
                            <input type="file" onChange={handleImageChangeOM} accept="image/*" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="opcionMultiple">Opción Múltiple:</label>
                            <select
                                id="multiple"
                                value={respuesta}
                                onChange={(e) => setRespuesta(e.target.value)}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1">Opción A</option>
                                <option value="2">Opción B</option>
                                <option value="3">Opción C</option>
                                <option value="4">Opción D</option>
                            </select>
                        </div>
                    </div>
                )}


                {tipo === 'booleano' && (
                    <div className="form-group">
                        <label htmlFor="booleano">Respuesta Booleana:</label>
                        <select
                            id="booleano"
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                        >
                            <option value="">Selecciona</option>
                            <option value="true">Verdadero</option>
                            <option value="false">Falso</option>
                        </select>
                    </div>
                )}

                {tipo === 'numerico' && (
                    <div className="form-group">
                        <label htmlFor="rangoNumericoInicio">Rango Numérico:</label>
                        <input
                            type="number"
                            id="rangoNumericoInicio"
                            placeholder="Inicio del rango"
                            value={respuesta[0] || ''} // Asegúrate de que siempre haya un valor
                            onChange={(e) => setRespuesta([e.target.value, respuesta[1]])}
                        />
                        <input
                            type="number"
                            id="rangoNumericoFin"
                            placeholder="Fin del rango"
                            value={respuesta[1] || ''} // Asegúrate de que siempre haya un valor
                            onChange={(e) => setRespuesta([respuesta[0], e.target.value])}
                        />
                    </div>
                )}

                    <div className="form-group">
                        <label>Nivel:</label>
                        <input
                            type="number"
                            value={nivel}
                            step="any"
                            onChange={(e) => setNivel(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Razonamiento:</label>
                        <img src={razonamiento} alt="Imagen del Reto" />
                        <input type="file" onChange={handleImageChangeRaz} accept="image/*" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="activo">Activo:</label>
                        <select
                        id="activo"
                        value={activo}
                        onChange={(e) => setActivo(e.target.value)}
                        >
                        <option value="">Selecciona</option>
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <button type="submit">Actualizar Reto</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default EditarReto;