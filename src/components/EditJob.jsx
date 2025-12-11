import React, { useEffect, useState } from "react";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../redux/api/employerApi";
import { useParams, useNavigate } from "react-router-dom";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetJobByIdQuery(id);
  const [updateJob] = useUpdateJobMutation();

  const [form, setForm] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    company: "",
    duration: "",
  });

  useEffect(() => {
    if (data && data.job) {
      setForm({
        title: data.job.title,
        location: data.job.location || "",
        salary: data.job.salary || "",
        description: data.job.description || "",
        company: data.job.company || "",
        duration: data.job.duration || "",
      });
    }
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateJob({ id, ...form }).unwrap();
      alert("Job updated successfully!");
      navigate("/employer/my-jobs");
    } catch (err) {
      console.error(err);
      alert("Failed to update job");
    }
  };

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Edit Job</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Company"
          className="w-full border p-3 rounded"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-3 rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="text"
          placeholder="Duration"
          className="w-full border p-3 rounded"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <input
          type="text"
          placeholder="Salary"
          className="w-full border p-3 rounded"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
