import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, roleRequired, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/login" />;
  }

  return Element;
};

export default PrivateRoute;
