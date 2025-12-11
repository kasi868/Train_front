// src/admin/AddJob.jsx
import React, { useState } from "react";
import { useCreateJobMutation } from "../redux/api/jobApi";

export default function AddJob() {
  const [createJob] = useCreateJobMutation();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createJob(form);
    alert("Job Posted!");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post New Job</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" onChange={handleChange} placeholder="Job Title" className="w-full border p-3" />
        <input name="company" onChange={handleChange} placeholder="Company Name" className="w-full border p-3" />
        <input name="location" onChange={handleChange} placeholder="Location" className="w-full border p-3" />
        <input name="salary" onChange={handleChange} placeholder="Salary" className="w-full border p-3" />

        <textarea name="description" onChange={handleChange} placeholder="Job Description" className="w-full border p-3"></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
}
