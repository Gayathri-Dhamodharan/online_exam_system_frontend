// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicRoute     from './PublicRoute';
import ProtectedRoute  from './ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AdminDashboard from '../pages/admin/AdminDashboard';
import QuestionBank from '../pages/admin/QuestionBank';
import Review from '../pages/admin/Review';
import Unauthorized from '../pages/auth/Unauthorized';
import UserDashboard from '../pages/user/UserDashboard';
import Exam from '../pages/user/Exam';
import Result from '../pages/user/Result';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// import Login           from '../pages/auth/Login';
// import Register        from '../pages/auth/Register';
// import AdminDashboard  from '../pages/admin/AdminDashboard';
// import QuestionBank    from '../pages/admin/QuestionBank';
// import Review          from '../pages/admin/Review';
// import UserDashboard   from '../pages/user/UserDashboard';
// import Exam            from '../pages/user/Exam';
// import Result          from '../pages/user/Result';

// import AdminLayout     from '../layouts/AdminLayout';
// import UserLayout      from '../layouts/UserLayout';
// import Unauthorized    from '../pages/Unauthorized';


const AppRoutes = () => (
  <Routes>
    {/* Public (no auth) */}
    <Route element={<PublicRoute />}>
      <Route path="/"                 element={<Navigate to="/login" replace />} />
      <Route path="/login"            element={<Login />} />
      <Route path="/register"         element={<Register />} />
      <Route path="/admin/register"   element={<Register />} />
    </Route>

    {/* Admin-only */}
    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index              element={<AdminDashboard />} />
        <Route path="dashboard"   element={<AdminDashboard />} />
        <Route path="questions"   element={<QuestionBank />} />
        <Route path="results"     element={<Review/>} />
      </Route>
    </Route>

    {/* Student-only */}
    <Route element={<ProtectedRoute allowedRoles={['student']} />}>
      <Route path="/user" element={<UserLayout/>}>
        <Route index            element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="exams"     element={<Exam/>} />
        <Route path="results"   element={<Result />} />
      </Route>
    </Route>

    {/* Unauthorized or anything else */}
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*"             element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
