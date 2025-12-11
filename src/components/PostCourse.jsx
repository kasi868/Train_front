// src/components/PostCourse.jsx
import React, { useState } from "react";
import { usePostCourseMutation } from "../redux/api/employerApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PostCourse() {
  const navigate = useNavigate();
  const [postCourse, { isLoading }] = usePostCourseMutation();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postCourse({
        title,
        duration,
        price,
        description,
      }).unwrap();

      alert("Course added successfully!");
      navigate("/employer/my-courses");
    } catch (err) {
      console.error(err);
      alert("Failed to add course");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-slate-800 mb-6"
        >
          Add New Course
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Course Title"
            className="w-full p-3 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Duration (e.g. 3 Months)"
            className="w-full p-3 border rounded-lg"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price (₹)"
            className="w-full p-3 border rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <textarea
            placeholder="Course Description"
            rows={4}
            className="w-full p-3 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {isLoading ? "Posting..." : "Add Course"}
          </button>

        </form>
      </div>
    </div>
  );
}
