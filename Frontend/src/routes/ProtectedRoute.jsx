import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role  = localStorage.getItem('role');

  if (!token) {
    // not logged in
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    // logged in but wrong role
    return <Navigate to="/unauthorized" replace />;
  }
  // logged in with correct role
  return <Outlet />;
};

export default ProtectedRoute;
