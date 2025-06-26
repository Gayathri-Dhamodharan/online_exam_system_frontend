// src/routes/PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role"); // 'admin' or 'student'

  if (token && role) {
    // map your app-paths explicitly:
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (role === "student") {
      return <Navigate to="/user/dashboard" replace />;
    }
    // optionally handle other roles here…
  }

  // no token → show login/register etc
  return <Outlet />;
};

export default PublicRoute;
