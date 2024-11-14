import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';
import './ResetPassword.css';

function ResetPassword() {
    const { token } = useParams(); // Obtenemos el token de la URL
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch(config.apiBaseUrl + `/api/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Hubo un problema al restablecer la contraseña.');
        }
    };

    return (
        <div className="reset-container">
            <h2>Restablecer contraseña</h2>
            <p></p>
            <form className="reset-form" onSubmit={handleSubmit} >
                <label htmlFor="password" >Nueva Contraseña:</label>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    id="password"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Confirmar Contraseña" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />

                <button type="submit" className="reset-button">Actualizar contraseña</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;