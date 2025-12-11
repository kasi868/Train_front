// src/components/Nav.jsx
import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Zap, User, ShieldCheck, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function Nav() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const linkClasses = ({ isActive }) =>
    `relative px-2 py-1 text-[15px] font-medium transition group
    ${isActive ? "text-indigo-600 font-semibold" : "text-slate-700 hover:text-indigo-600"}`;

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="p-2 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl text-white shadow"
            >
              <Zap size={20} />
            </motion.div>

            <div>
              <div className="font-extrabold text-xl text-slate-800">TrainHire</div>
              <div className="text-xs text-slate-500">Train • Test • Hire</div>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6">

              <NavLink to="/" className={linkClasses}>Home</NavLink>
              <NavLink to="/courses" className={linkClasses}>Courses</NavLink>
              <NavLink to="/jobs" className={linkClasses}>Jobs</NavLink>
              <NavLink to="/internships" className={linkClasses}>Internships</NavLink>
              <NavLink to="/portfolio" className={linkClasses}>Portfolio</NavLink>

              {/* USER PROFILE */}
              {token && role === "user" && (
                <NavLink to="/profile" className={linkClasses}>
                  <div className="flex items-center gap-1">
                    <User size={18} />
                    Profile
                  </div>
                </NavLink>
              )}

              {/* EMPLOYER DASHBOARD */}
              {token && role === "employer" && (
                <NavLink to="/employer" className={linkClasses}>
                  <div className="flex items-center gap-1 text-green-600">
                    <Briefcase size={18} />
                    Employer Dashboard
                  </div>
                </NavLink>
              )}

              {/* ADMIN PANEL */}
              {token && role === "admin" && (
                <NavLink to="/admin" className={linkClasses}>
                  <div className="flex items-center gap-1 text-red-600">
                    <ShieldCheck size={18} />
                    Admin Panel
                  </div>
                </NavLink>
              )}

            </div>

            {/* NOT LOGGED IN */}
            {!token && (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    Login
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-50 transition"
                  >
                    Register
                  </Link>
                </motion.div>
              </>
            )}

            {/* LOGOUT */}
            {token && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}
