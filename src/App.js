// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Navbar
import Nav from "./components/Nav";

// Core Pages
import Home from "./components/Home";
import CoursesPage from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

// Jobs + Internships
import JobsPage from "./components/Jobs";
import JobDetail from "./components/JobDetail";

// Extra Features
import SavedJobs from "./components/SavedJobs";
import Alerts from "./components/Alerts";
import CompanyPage from "./components/CompanyPage";
import Messaging from "./components/Messaging";
import EmployerDashboard from "./components/EmployerDashboard";

// Employer Components
import PostJob from "./components/PostJob";
import PostInternship from "./components/PostInternship";
import PostCourse from "./components/PostCourse";

import MyJobs from "./components/MyJobs";
import MyInternships from "./components/MyInternships";
import MyCourses from "./components/MyCourses";

// ⭐ EDIT PAGES (IMPORTANT)
import EditJob from "./components/EditJob";
import EditInternship from "./components/EditInternship";
import EditCourse from "./components/EditCourse";

// Admin Panel
import AdminPanel from "./components/AdminPanel";

// ⭐ FIXED ADMIN IMPORT PATHS
import AdminJobs from "./admin/AdminJobs";
import AdminInternships from "./admin/AdminInternships";
import AdminCourses from "./admin/AdminCourses";

import AdminAddJob from "./admin/AdminAddJob";
import AdminAddInternship from "./admin/AdminAddInternship";
import AdminAddCourse from "./admin/AdminAddCourse";

// Tools + Utilities
import ChatBot from "./components/ChatBot";
import PortfolioBuilder from "./components/PortfolioBuilder";
import CVBuilder from "./components/CVBuilder";
import ScheduleInterview from "./components/ScheduleInterview";
import Contact from "./components/Contact";

// Auth Pages
import Login from "./components/Login";
import Register from "./components/Register";

// Profile Pages
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

// Dashboard
import Dashboard from "./components/Dashboard";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* COURSES */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* JOBS */}
        <Route path="/jobs" element={<JobsPage filterType="job" />} />
        <Route path="/jobs/:id" element={<JobDetail />} />

        {/* INTERNSHIPS */}
        <Route path="/internships" element={<JobsPage filterType="internship" />} />

        {/* EMPLOYER DASHBOARD */}
        <Route path="/employer" element={<EmployerDashboard />} />

        {/* EMPLOYER POST ROUTES */}
        <Route path="/employer/post-job" element={<PostJob />} />
        <Route path="/employer/post-internship" element={<PostInternship />} />
        <Route path="/employer/post-course" element={<PostCourse />} />

        {/* EMPLOYER MANAGEMENT ROUTES */}
        <Route path="/employer/my-jobs" element={<MyJobs />} />
        <Route path="/employer/my-internships" element={<MyInternships />} />
        <Route path="/employer/my-courses" element={<MyCourses />} />

        {/* ⭐ EMPLOYER EDIT ROUTES */}
        <Route path="/employer/edit-job/:id" element={<EditJob />} />
        <Route path="/employer/edit-internship/:id" element={<EditInternship />} />
        <Route path="/employer/edit-course/:id" element={<EditCourse />} />

        {/* TOOLS */}
        <Route path="/portfolio" element={<PortfolioBuilder />} />
        <Route path="/cv-builder" element={<CVBuilder />} />

        {/* COMMUNICATION */}
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/messages" element={<Messaging />} />

        {/* COMPANY */}
        <Route path="/company/:id" element={<CompanyPage />} />

        {/* JOB UTILITIES */}
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/schedule-interview" element={<ScheduleInterview />} />

        {/* ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />

        {/* ADMIN JOBS */}
        <Route
          path="/admin/jobs"
          element={
            <ProtectedAdminRoute>
              <AdminJobs />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/jobs/add"
          element={
            <ProtectedAdminRoute>
              <AdminAddJob />
            </ProtectedAdminRoute>
          }
        />

        {/* ADMIN INTERNSHIPS */}
        <Route
          path="/admin/internships"
          element={
            <ProtectedAdminRoute>
              <AdminInternships />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/internships/add"
          element={
            <ProtectedAdminRoute>
              <AdminAddInternship />
            </ProtectedAdminRoute>
          }
        />

        {/* ADMIN COURSES */}
        <Route
          path="/admin/courses"
          element={
            <ProtectedAdminRoute>
              <AdminCourses />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/courses/add"
          element={
            <ProtectedAdminRoute>
              <AdminAddCourse />
            </ProtectedAdminRoute>
          }
        />

        {/* CONTACT */}
        <Route path="/contact" element={<Contact />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* EDIT PROFILE */}
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={<div className="p-8 text-center text-xl">Page not found</div>}
        />

      </Routes>
    </div>
  );
}
