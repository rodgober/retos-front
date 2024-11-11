import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './../assets/mathethonsmall.png';
import HamburgerMenu from './HamburgerMenu';

const Header = ({ isAuthenticated, userMail, setIsAuthenticated, userRole, userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de cierre de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userMail');
    localStorage.removeItem('name');
    setIsAuthenticated(false);
    //setuserMail('');
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login'); // Redirige a la página de login
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la página de login
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <>

    
             <HamburgerMenu isAuthenticated={isAuthenticated}/>


      <div className="logo">
        <a href="/">
          <img src={logo} alt="Logotipo de Mathethon" />
        </a>
      </div>
      <div className="nave-space"></div>
      <div className="nave-space"></div>
      <div className="nave-space"></div>

      <nav className="nav-menu">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/about">¿Quiénes somos?</a></li>
          <li><a href="/contact">Contacto</a></li>
          <li><a href="/statistics">Ranking</a></li>
        </ul>
      </nav>
     
      <div className="cta-buttons">
        {isAuthenticated ? (
          <>
            <div onClick={() => window.location.href = '/perfil'} style={{ cursor: 'pointer' }}>
              <AccountCircleIcon style={{ fontSize: 40 }} />
            </div>
             
            <button className="btn signup-btn" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button className="btn login-btn" onClick={handleLoginClick}>
              Iniciar Sesión
            </button>

            <button className="btn signup-btn" onClick={handleRegisterClick}>
              Registrarse
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
