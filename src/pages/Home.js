import { useNavigate } from 'react-router-dom';
import './Home.css';
import kid from './../assets/mathethon_kid.jpeg';


const Home = ({ setIsAuthenticated, setUserMail }) => {

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la página de login
  };
  return (
    <div className="container-home">
      <img src={kid} alt='Mathethon' />

      <div className="floating-box">
        <h4>Desarrolla tus habilidades matemáticas </h4>
      </div>

      
      <h1 className='slogan'>El objetivo del Mathethon es alentar, desafiar y desarrollar habilidades matemáticas de cualquier persona interesada en la resolución de retos</h1>
      <div className="grid-container">
          <div className="grid-item">
              <h3>¿Qué es el Mathethon?</h3>
              <p>Es una colección de retos matemáticos que requieren de lógica, comprensión del lenguaje, perseverancia y algunas veces sentido común para lograr resolverlos</p>
          </div>
          <div className="grid-item">
              <h3>¿A quién van dirigidos los retos?</h3>
              <p>Principalmente para estudiantes de nivel secundaria, sin embargo, nuestro deseo es que cualquier persona que le interesen los retos pueda practicar o encontrar maneras alternativas de soluciones.</p>
          </div>
          <div className="grid-item">
              <h3>¿Cualquier persona puede resolverlos?</h3>
              <p>Los retos varían en dificultad y al resolverlos obtendrá la experiencia que le permitirá abordar un nuevo reto que antes era inaccesible. De modo que el participante decidido irá resolviendo cada reto de forma lenta pero segura.</p>
          </div>
          <div className="grid-item">
              <h3>¿Qué se necesita para participar?</h3>
              <p>Lo único que necesitas es un correo electrónico y ganas de participar, regístrate, es GRATIS</p>
              <button className="participa-button" onClick={handleRegisterClick}>
              ¡Regístrate!
              </button>
          </div>
      </div>






      

      <button className="floating-button" onClick={handleRegisterClick}>
              ¡ Participa !
            </button>
    </div>
  );
}

export default Home;
