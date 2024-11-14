import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Statistics from './pages/user/Statistics';
import Dashboard from './pages/admin/Dashboard';
import Perfil from './pages/user/Perfil';
import NotFound from './pages/NotFound'; // Importa el componente 404
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header'; // Importa el Header
import Reto from './pages/admin/Reto';
import DetalleReto from './pages/user/DetalleReto';
import ListarRetos from './pages/user/ListarRetos';
import RetosActivos from './pages/admin/RetosActivos';
import RetosInactivos from './pages/admin/RetosInactivos';
import EditarReto from './pages/admin/EditarReto';
import Home from './pages/Home';
import Footer from './components/Footer';
import PublicRoute from './components/PublicRoute';
import RecuperarPassword from './pages/RecuperarPassword';
import ResetPassword from './pages/ResetPassword';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMail, setUserMail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const location = useLocation();
  useEffect(() => {
    const role = localStorage.getItem('userRole')
    const mail = localStorage.getItem('userMail')
    const name = localStorage.getItem('name')
    if (role && mail) {
      setIsAuthenticated(true);
      setUserMail(mail);
      setUserRole(role);
      setUserName(name);
    }
  }, []);

  useEffect(() => {
    // Esto asegura que Google Analytics capture cada cambio de ruta.
    window.gtag('config', 'G-1QWR7WWVBM', {
      page_path: location.pathname,
    });
  }, [location]);


  return (
      <div className="container">
        <header className="header">
          <Header isAuthenticated={isAuthenticated} userMail={userMail} setIsAuthenticated={setIsAuthenticated} userRole={userRole} userName={userName} />
        </header>
        <div className="content">          
            <Routes>
              <Route path="/" element={<Home to="/home" />} />
              <Route path="/register" element={<PublicRoute element={<Register />}  />} />
              <Route path='/login' element={<PublicRoute element={
                <Login setIsAuthenticated={setIsAuthenticated} setUserMail={setUserMail}/> }>
                </PublicRoute>} />             
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/forgotpassword" element={<RecuperarPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} roleRequired="admin" />} />
              <Route path="/reto" element={<PrivateRoute element={<Reto />} roleRequired="admin" />} />
              <Route path="/retosactivos" element={<PrivateRoute element={<RetosActivos />} roleRequired="admin" />} />
              <Route path="/retosinactivos" element={<PrivateRoute element={<RetosInactivos />} roleRequired="admin" />} />
              <Route path="/editar/:id" element={<PrivateRoute element={<EditarReto />} roleRequired="admin" />} />
              <Route path="/perfil" element={<PrivateRoute element={<Perfil />} roleRequired="user" />} />
              <Route path="/reto/:id" element={<PrivateRoute element={<DetalleReto />} roleRequired="user" />} />
              <Route path="/retos" element={<PrivateRoute element={<ListarRetos />} roleRequired="user" />} />
              <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
            </Routes>
        </div> 
        <div className='footer'>
          <Footer />
        </div>
      </div> 
  );
}

export default App;
