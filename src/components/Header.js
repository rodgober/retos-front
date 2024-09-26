import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const userMail = localStorage.getItem('userMail');
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userMail');
    localStorage.removeItem('userRole');
    navigate('/login'); // Redirige a la página de login después de cerrar sesión
  };

  // Función para manejar el clic en el logo
  const handleLogoClick = () => {
    if (userRole === 'admin') {
      navigate('/reto'); // Redirige a Dashboard si es admin
    } else if (userRole === 'user') {
      navigate('/retos'); // Redirige a Perfil si es user
    } else {
      navigate('/'); // Si no hay rol, redirige a la página de inicio
    }
  };

  return (
    <header style={styles.header}>

      <div onClick={handleLogoClick} style={styles.logoContainer}>
        {/* Aquí va tu logo */}
        <h2>Club de matemáticas</h2>
      </div>


      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        {userMail && (
          <>
            <Link to="/retos" style={styles.link}>Retos</Link>
            <Link to="/reto" style={styles.link}>Agregar reto</Link>
          </>
        )}
      </nav>
      <div style={styles.userInfo}>
        {userMail ? (
          <>
            <span>{userMail}</span>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </header>
  );
}

const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      background: '#333',
      color: '#fff',
    },
    logoContainer: {
      cursor: 'pointer',
    },
    logo: {
      height: '40px', // Ajusta el tamaño del logo
    },
    link: {
      marginRight: '15px',
      color: '#fff',
      textDecoration: 'none',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    logoutButton: {
      marginLeft: '10px',
      padding: '5px 10px',
      background: '#f44336',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    },
  };

export default Header;
