import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  ArrowRight,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Determine mode
  const mode = pathname === "/admin/register" ? "admin" : "student";

  // Shared input classes + mode-specific border color
  const inputClass = `
    w-full px-3 py-2 text-sm border rounded-lg
    focus:ring-1 focus:ring-teal-500
    ${mode === "student" ? "border-blue-500" : "border-red-500"}
  `;

  // Build validation schema based on mode
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName:  Yup.string().required("Required"),
    email:     Yup.string().email("Invalid").required("Required"),
    password:  Yup.string().min(6, "Min 6 chars").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Must match")
      .required("Required"),

    // Student-only
    className: mode === "student"
      ? Yup.string().required("Class is required")
      : Yup.string().notRequired(),
    section: mode === "student"
      ? Yup.string().required("Section is required")
      : Yup.string().notRequired(),

    // Admin-only
    graduateIn: mode === "admin"
      ? Yup.string().required("Graduate In is required")
      : Yup.string().notRequired(),
    joiningDate: mode === "admin"
      ? Yup.date().required("Joining Date is required")
      : Yup.date().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      firstName:     "",
      lastName:      "",
      email:         "",
      password:      "",
      confirmPassword: "",
      role:          mode,            // hidden
      className:     "",              // student
      section:       "",              // student
      graduateIn:    "",              // admin
      joiningDate:   "",              // admin (YYYY-MM-DD)
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post("/api/auth/register", values);
        navigate("/login");
      } catch (err) {
        const msg = err.response?.data?.message || "Registration failed";
        setErrors({ email: msg });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f1e8] via-[#82e8d6] to-[#001922] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 rounded-xl shadow-lg p-6">
          <div className="text-center mb-4">
            <Users className="mx-auto mb-2 w-12 h-12 text-teal-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "admin" ? "Admin Sign Up" : "Student Sign Up"}
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Hidden role */}
            <input type="hidden" name="role" value={mode} />

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["firstName", "lastName"].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-700 mb-1">
                    {field === "firstName" ? "First Name" : "Last Name"}
                  </label>
                  <input
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputClass}
                    placeholder={field === "firstName" ? "First name" : "Last name"}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-xs text-red-500">{formik.errors[field]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass} pl-10`}
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass} pl-10 pr-10`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputClass} pl-10 pr-10`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-xs text-red-500">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Mode-specific fields */}
            {mode === "student" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Class */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Class</label>
                  <input
                    name="className"
                    value={formik.values.className}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputClass}
                    placeholder="e.g. 10th Grade"
                  />
                  {formik.touched.className && formik.errors.className && (
                    <p className="text-xs text-red-500">{formik.errors.className}</p>
                  )}
                </div>
                {/* Section */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">Section</label>
                  <input
                    name="section"
                    value={formik.values.section}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputClass}
                    placeholder="e.g. A"
                  />
                  {formik.touched.section && formik.errors.section && (
                    <p className="text-xs text-red-500">{formik.errors.section}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Graduate In */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">
                    Graduate In
                  </label>
                  <input
                    name="graduateIn"
                    value={formik.values.graduateIn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputClass}
                    placeholder="e.g. Computer Science"
                  />
                  {formik.touched.graduateIn && formik.errors.graduateIn && (
                    <p className="text-xs text-red-500">{formik.errors.graduateIn}</p>
                  )}
                </div>
                {/* Joining Date */}
                <div>
                  <label className="block text-xs text-gray-700 mb-1">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formik.values.joiningDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={inputClass}
                  />
                  {formik.touched.joiningDate && formik.errors.joiningDate && (
                    <p className="text-xs text-red-500">{formik.errors.joiningDate}</p>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mode === "admin" ? "Create Admin" : "Create Student"}
              <ArrowRight className="w-4 h-4"/>
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-teal-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
