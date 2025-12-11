// src/components/PostInternship.jsx
import React, { useState } from "react";
import { usePostInternshipMutation } from "../redux/api/employerApi";
import { useNavigate } from "react-router-dom";

export default function PostInternship() {
  const navigate = useNavigate();
  const [postInternship, { isLoading }] = usePostInternshipMutation();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    stipend: "",
    duration: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postInternship({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      }).unwrap();

      alert("Internship posted successfully!");
      navigate("/employer/my-internships");

    } catch (err) {
      console.error(err);
      alert("Failed to post internship");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Post Internship
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Title"
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
            name="stipend"
            placeholder="Stipend"
            className="w-full p-3 border rounded-lg"
            value={form.stipend}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            className="w-full p-3 border rounded-lg"
            value={form.duration}
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
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isLoading ? "Posting..." : "Post Internship"}
          </button>

        </form>

      </div>
    </div>
  );
}
