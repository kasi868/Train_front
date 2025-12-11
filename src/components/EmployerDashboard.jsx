// src/components/EmployerDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap, Layers } from "lucide-react";

export default function EmployerDashboard() {
  const navigate = useNavigate();

  // FIXED FUNCTION
  const goToPost = (type) => {
    if (type === "job") navigate("/employer/post-job");
    if (type === "internship") navigate("/employer/post-internship");
    if (type === "course") navigate("/employer/post-course");
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          Employer Dashboard
        </h2>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* POST JOB */}
          <div
            onClick={() => goToPost("job")}
            className="cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Briefcase className="text-indigo-600" size={25} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Post a Job</h3>
                <p className="text-sm text-slate-500">Add new job openings</p>
              </div>
            </div>
          </div>

          {/* POST INTERNSHIP */}
          <div
            onClick={() => goToPost("internship")}
            className="cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Layers className="text-green-600" size={25} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Post Internship</h3>
                <p className="text-sm text-slate-500">Add internship positions</p>
              </div>
            </div>
          </div>

          {/* POST COURSE */}
          <div
            onClick={() => goToPost("course")}
            className="cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <GraduationCap className="text-purple-600" size={25} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Add Course</h3>
                <p className="text-sm text-slate-500">Publish training courses</p>
              </div>
            </div>
          </div>

        </div>

        {/* MANAGEMENT SECTIONS */}
        <h3 className="text-xl font-bold mt-10 mb-4">Manage Your Listings</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <button
            onClick={() => navigate("/employer/my-jobs")}
            className="p-4 bg-white shadow rounded-lg text-left hover:bg-indigo-50 transition"
          >
            My Jobs
          </button>

          <button
            onClick={() => navigate("/employer/my-internships")}
            className="p-4 bg-white shadow rounded-lg text-left hover:bg-green-50 transition"
          >
            My Internships
          </button>

          <button
            onClick={() => navigate("/employer/my-courses")}
            className="p-4 bg-white shadow rounded-lg text-left hover:bg-purple-50 transition"
          >
            My Courses
          </button>

        </div>
      </div>
    </div>
  );
}
