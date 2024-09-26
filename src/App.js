import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Perfil from './pages/user/Perfil';
import NotFound from './pages/NotFound'; // Importa el componente 404
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header'; // Importa el Header
import Reto from './pages/admin/Reto';
import DetalleReto from './pages/user/DetalleReto';
import ListarRetos from './pages/user/ListarRetos';
import Menu from './components/Menu';

function App() {
  return (
    <Router>
      <Header /> {/* Mostrar Header en todas las páginas */}
      <Menu />
      <Routes>
        <Route path="/" element={<Login to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} roleRequired="admin" />} />
        <Route path="/reto" element={<PrivateRoute element={<Reto />} roleRequired="admin" />} />
        <Route path="/perfil" element={<PrivateRoute element={<Perfil />} roleRequired="user" />} />
        <Route path="/reto/:id" element={<PrivateRoute element={<DetalleReto />} roleRequired="user" />} />
        <Route path="/retos" element={<PrivateRoute element={<ListarRetos />} roleRequired="user" />} />
        <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
      </Routes>
    </Router>
  );
}

export default App;
