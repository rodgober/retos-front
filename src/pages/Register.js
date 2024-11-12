import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [lastName, setLastname] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('user');
  const [nivel, setNivel] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar el popup
  const navigate = useNavigate();

  const handlePopupClose = () => {
    setShowPopup(false); // Cierra el popup
    navigate('/login'); // Redirige al usuario a la página de login
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post(config.apiBaseUrl + '/api/register', { name, lastName, mail, password, role, nivel });
      if (response.status === 201) {
        setShowPopup(true); // Muestra el popup si el registro es exitoso
      }
    } catch (error) {
      setMessage(error.response.data);
    }
  };





  return (
      <div className='register-container'>
        <div className="left-section">
          <h1 className="logo-mathethon">Mathethon</h1>
          <p className="tagline">Conéctate y descubre nuevos retos matemáticos para mejorar tus habilidades.</p>
        </div>
        <div className="right-section">
            <h1>Crea una nueva cuenta</h1>
            <p>Es fácil y gratuita</p>
            <form className="register-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastname(e.target.value)} required />
              <input type="email" placeholder="Correo" value={mail} onChange={(e) => setMail(e.target.value)} required />
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input type="password" placeholder="Confirmar Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <button type="submit" className="register-button">Crear cuenta</button>
              {message && <p>{message}</p>}
              <hr />
              <a href="/login" className="forgot-password">¿Ya tienes una cuenta?</a>  
            </form>

                {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h3>¡Registro exitoso!</h3>
                <p>Gracias por registrarte. Por favor, inicia sesión para continuar.</p>
                <button onClick={handlePopupClose}>Aceptar</button>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default Register;
