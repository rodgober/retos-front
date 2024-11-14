import React, { useState } from 'react';
import config from '../config';
import './RecuperarPassword.css';


function RecuperarPassword() {
    const [mail, setMail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(config.apiBaseUrl + '/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Hubo un problema al enviar la solicitud.');
        }
    };

    return (
        <div className="forgot-container">
            <h2>Recupera tu contraseña</h2>
            <p></p>
            <form className="forgot-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Ingresa tu correo" 
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />
                <button type="submit" className="forgot-button">Enviar enlace de recuperación</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default RecuperarPassword;