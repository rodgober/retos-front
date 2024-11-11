import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HamburgerMenu.css';

const HamburgerMenu = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleRetosClick = () => {
    closeMenu();
    navigate('/retos');
  };

  const handleInicioClick = () => {
    closeMenu();
    navigate('/');
  };

  const handleQuienesClick = () => {
    closeMenu();
    navigate('/about');
  };

  const handleContactoClick = () => {
    closeMenu();
    navigate('/contact');
  };

  const handlePerfilClick = () => {
    closeMenu();
    navigate('/perfil');
  };

  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="menu-container">
      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Sidebar deslizante */}
      <div className={`sidebar ${isOpen ? 'show' : ''}`} onClick={handleSidebarClick}>
        <nav onClick={(e) => e.stopPropagation()}>
          <ul>
            {isAuthenticated ? (<li onClick={handleRetosClick}>Retos</li> ): null }
            {isAuthenticated ? (<li onClick={handlePerfilClick}>Perfil</li> ): null }
            <li onClick={handleInicioClick}>Inicio</li>
            <li onClick={handleQuienesClick}>¿Quiénes somos?</li>
            <li onClick={handleContactoClick}>Contacto</li>
          </ul>
        </nav>
      </div>

      {/* Overlay para cerrar el sidebar cuando se hace clic fuera */}
      {isOpen && <div className="overlay" onClick={closeMenu}></div>}
    </div>
  );
};

export default HamburgerMenu;
