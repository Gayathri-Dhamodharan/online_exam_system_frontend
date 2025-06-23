import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import RoleSelection from "../layouts/RoleSelection";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import QuestionBank from "../pages/admin/QuestionBank";
import QuestionPaper from "../pages/admin/QuestionPaper";
import AdminResult from "../pages/admin/AdminResult";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserDashboard from "../pages/user/UserDashboard";
import UserResult from "../pages/user/UserResult";
import Exam from "../pages/user/Exam";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";



const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route element={<PublicRoute />}>
      <Route path="/" element={<Navigate to="/choose-role" />} />
      <Route path="/choose-role" element={<RoleSelection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    {/* Admin Private Routes */}
    <Route element={<PrivateRoute allowedRole="admin" />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/questions" element={<QuestionBank />} />
        <Route path="/admin/papers" element={<QuestionPaper />} />
        <Route path="/admin/results" element={<AdminResult />} />
      </Route>
    </Route>

    {/* User Private Routes */}
    <Route element={<PrivateRoute allowedRole="user" />}>
      <Route element={<UserLayout />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/exams" element={<Exam />} />
        <Route path="/user/results" element={<UserResult />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
