import React from 'react';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div>
      <h1>Perfil</h1>
      <p>Welcome to your Profile!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Perfil;
