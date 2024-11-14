import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import './Contact.css';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(config.apiBaseUrl + '/api/contacto/mensaje', { email, message });
        setStatus("Mensaje enviado con éxito.");
        setEmail('');
        setMessage('');
    } catch (error) {
        setStatus("Hubo un error al enviar el mensaje.");
    }
};
  return (
    <div className="container-contact">
      <h2 className="contact-form-title">Contáctanos</h2>
      <p>Para ponerte en contacto con nosotros, ya sea para corregir la redacción o resultado de un reto, 
        para proponer nuevos retos, adaptar o agregar nuevas funcionalidades o simplemente para manter una conversación, 
        envíanos un mensaje.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
            <label>
                Escribe tu correo:
                <input 
                    type="email" 
                    placeholder="Correo"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Escribe tu comentario:
                <textarea 
                    placeholder="Escribe tu comentario"
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                />
            </label>
            <button type="submit">Enviar</button>
            <p>{status}</p>
        </form>
    </div>
  );
}

export default Contact;