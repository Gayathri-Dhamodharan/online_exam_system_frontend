// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   BookOpen,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   User,
//   UserCheck,
//   ArrowRight,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Login = ({ onSwitchToRegister, onLogin }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//       role: "student",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email").required("Required"),
//       password: Yup.string()
//         .min(6, "Minimum 6 characters")
//         .required("Required"),
//     }),
//     onSubmit: (values) => {
//       onLogin(values); // Call your login logic
//       localStorage.setItem("selectedRole", values.role);

//       // Navigate based on role
//       if (values.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/user/dashboard");
//       }
//     },
 

//   });

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f1e8] via-[#82e8d6] to-[#001922] px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-8">
//           <div className="text-center mb-6">
//             <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
//               <BookOpen className="w-6 h-6 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
//             <p className="text-sm text-gray-600">Sign in to your account</p>
//           </div>

//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             {/* Role */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Role</label>
//               <div className="relative">
//                 <select
//                   name="role"
//                   value={formik.values.role}
//                   onChange={formik.handleChange}
//                   className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-teal-500"
//                 >
//                   <option value="student">Student</option>
//                   <option value="admin">Admin</option>
//                 </select>
//                 {formik.values.role === "admin" ? (
//                   <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 ) : (
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 )}
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Email</label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter email"
//                 />
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               </div>
//               {formik.touched.email && formik.errors.email && (
//                 <p className="text-xs text-red-500 mt-1">
//                   {formik.errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter password"
//                 />
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-4 h-4" />
//                   ) : (
//                     <Eye className="w-4 h-4" />
//                   )}
//                 </button>
//               </div>
//               {formik.touched.password && formik.errors.password && (
//                 <p className="text-xs text-red-500 mt-1">
//                   {formik.errors.password}
//                 </p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-xl font-medium hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
//             >
//               Sign In <ArrowRight className="w-4 h-4" />
//             </button>
//           </form>

//           <div className="mt-4 text-center text-sm">
//             <p className="text-gray-600">
//               Don’t have an account?
//               <button
//                 onClick={() => navigate("/register")}
//                 className="text-teal-600 hover:underline"
//               >
//                 Create one here
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "admin", // default can be 'admin' or 'student'
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // Simulate login logic
      localStorage.setItem("token", "mockToken123"); // Simulated token
      localStorage.setItem("selectedRole", values.role); // For PrivateRoute

      // Navigate based on role
      if (values.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    },
  });

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f1e8] via-[#82e8d6] to-[#001922] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl px-8 py-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
              </select>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter email"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="w-full pl-10 pr-10 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter password"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2 rounded-xl font-medium hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don’t have an account?
              <button
                onClick={() => navigate("/register")}
                className="text-teal-600 hover:underline ml-1"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
