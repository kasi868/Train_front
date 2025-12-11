// src/components/Courses.jsx
import React, { useState } from "react";
import CourseCard from "../components/CourseCard";
import { motion } from "framer-motion";
import { useGetCoursesQuery } from "../redux/api/courseApi";

export default function CoursesPage() {
  const [mode, setMode] = useState("All");

  const { data: courses = [], isLoading } = useGetCoursesQuery();

  if (isLoading)
    return <div className="p-10 text-center text-lg">Loading courses...</div>;

  const filteredCourses =
    mode === "All" ? courses : courses.filter((c) => c.mode === mode);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-14 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-slate-800">
            Explore Courses
          </h2>

          <p className="text-slate-600 font-semibold mt-3 text-lg max-w-2xl">
            Online and Offline training programs to make you job-ready.
          </p>

          <div className="flex gap-3 mt-6">
            {["All", "Online", "Offline"].map((opt) => (
              <button
                key={opt}
                onClick={() => setMode(opt)}
                className={`px-5 py-2 rounded-xl border text-sm font-medium transition shadow-sm
                  ${
                    mode === opt
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                      : "border-slate-300 bg-white hover:bg-slate-100"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCourses.map((course) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border transition cursor-pointer"
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
