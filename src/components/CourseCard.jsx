// src/components/CourseCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  if (!course) return null;

  return (
    <div className="p-5 rounded-xl shadow-md bg-white border hover:shadow-lg transition duration-300">
      
      {/* TOP CONTENT */}
      <div className="flex justify-between items-start">
        
        {/* LEFT SECTION */}
        <div>
          <div className="font-bold text-xl text-slate-800">
            {course.title}
          </div>

          <div className="text-sm text-slate-500 mt-1">
            {course.mode} • {course.duration}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="text-right">
          <div className="text-indigo-600 text-lg font-bold">
            {course.price}
          </div>
          <div className="text-xs text-slate-400">
            {course.videos} videos
          </div>
        </div>

      </div>

      {/* SUMMARY */}
      <p className="mt-4 text-slate-600 leading-relaxed">
        {course.summary}
      </p>

      {/* BUTTONS */}
      <div className="mt-5 flex gap-3">
        <Link
          to={`/courses/${course._id}`}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          View Details
        </Link>

        <Link
          to="/contact"
          className="px-4 py-2 rounded-md border border-slate-300 hover:bg-slate-100 transition"
        >
          Contact
        </Link>
      </div>

    </div>
  );
}
