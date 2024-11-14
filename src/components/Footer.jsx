import React, { useState, useEffect } from 'react';
import config from '../config';

const Footer = () => {
    const estiloVersion = {
        fontSize: '10px',
        fontFamily: 'Arial, sans-serif',
        color: '#3498db',
        marginTop: '0px', 
        marginBottom: '0px'
      };
      const copyright = {
        marginTop: '10px', 
        marginBottom: '0px'
      };

    const [error, setError] = useState(null);
    const [version, setVersion] = useState(null);
    useEffect(() => {
        const obtenerVersion = async () => {
          try {
            const token = localStorage.getItem('token'); // Obtener token JWT
            const response = await fetch(config.apiBaseUrl + '/api/reto/', {
                method: 'GET',
              });
            const data = await response.json();
            setVersion(data.version);
          } catch (error) {
            setError(error.message);
          }
        };
        obtenerVersion();
      }, []);


    return ( 
        <div>
            <p style={copyright}>© 2024 Mathethon. Todos los derechos reservados.</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p style={estiloVersion}>Backend: {version} Frontend: {config.version}</p>
        </div>
     );
}
 
export default Footer;