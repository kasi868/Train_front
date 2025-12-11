import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link to="/admin/courses" className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
          <h3 className="font-bold text-xl">Manage Courses</h3>
          <p className="text-slate-600 mt-2">Add, update, delete courses</p>
        </Link>

        <Link to="/admin/jobs" className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
          <h3 className="font-bold text-xl">Manage Jobs</h3>
          <p className="text-slate-600 mt-2">Add or remove job openings</p>
        </Link>

        <Link to="/admin/internships" className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
          <h3 className="font-bold text-xl">Manage Internships</h3>
          <p className="text-slate-600 mt-2">Add new internships</p>
        </Link>

        <Link to="/admin/tests" className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
          <h3 className="font-bold text-xl">Manage Tests</h3>
          <p className="text-slate-600 mt-2">Create & edit test questions</p>
        </Link>

        <Link to="/admin/users" className="p-6 bg-white shadow rounded-xl hover:shadow-lg">
          <h3 className="font-bold text-xl">Manage Users</h3>
          <p className="text-slate-600 mt-2">View or block users</p>
        </Link>

      </div>
    </div>
  );
}
