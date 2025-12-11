// src/components/PostJob.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePostJobMutation } from "../redux/api/employerApi";

export default function PostJob() {
  const [postJob] = usePostJobMutation();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postJob({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      }).unwrap();

      alert("Job posted successfully!");

      setForm({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        skills: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
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
          Post Job
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full p-3 border rounded-lg"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            className="w-full p-3 border rounded-lg"
            value={form.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-3 border rounded-lg"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            className="w-full p-3 border rounded-lg"
            value={form.salary}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            rows={4}
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            className="w-full p-3 border rounded-lg"
            value={form.skills}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
