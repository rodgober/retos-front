import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Element, roleRequired, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  

  if (token) {
    console.log("Tiene token", token);
    return userRole === "user" ? <Navigate to="/perfil" /> : <Navigate to="/dashboard" />;
  }

  return Element;
};

export default PublicRoute;
