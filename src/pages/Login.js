import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './Login.css';

const Login = ({ setIsAuthenticated, setUserMail }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(config.apiBaseUrl + '/api/login', { mail, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userMail', mail);
      localStorage.setItem('name',response.data.name)
      localStorage.setItem('userRole', response.data.role);
      setIsAuthenticated(true);
      setUserMail(mail);
      if (response.data.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/perfil');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Ocurrió un error. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la página de login
  };
  return (
      <div className='login-container'>
        <div className="left-section">
          <h1 className="mathethon">Mathethon</h1>
          <p className="tagline">Conéctate y descubre nuevos retos matemáticos para mejorar tus habilidades.</p>
        </div>
        <div className="right-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Correo" value={mail} onChange={(e) => setMail(e.target.value)} required />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="login-button">Iniciar sesión</button>
            {message && <p>{message}</p>}
            <a href="/forgotpassword" className="forgot-password">¿Se te olvidó tu contraseña?</a>
            <hr />
            <button type="button" className="create-account-button" onClick={handleRegisterClick}>Crear una cuenta nueva</button>
          </form>
        </div>
      </div>
  );
}

export default Login;
