import React, { useEffect, useState } from "react";
import {
  useGetInternshipByIdQuery,
  useUpdateInternshipMutation,
} from "../redux/api/employerApi";
import { useParams, useNavigate } from "react-router-dom";

export default function EditInternship() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetInternshipByIdQuery(id);
  const [updateInternship] = useUpdateInternshipMutation();

  const [form, setForm] = useState({
    title: "",
    location: "",
    stipend: "",
    description: "",
    duration: "",
    company: "",
  });

  useEffect(() => {
    if (data && data.internship) {
      setForm({
        title: data.internship.title,
        location: data.internship.location || "",
        stipend: data.internship.stipend || "",
        description: data.internship.description || "",
        duration: data.internship.duration || "",
        company: data.internship.company || "",
      });
    }
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateInternship({ id, ...form }).unwrap();
      alert("Internship updated successfully!");
      navigate("/employer/my-internships");
    } catch (err) {
      console.error(err);
      alert("Failed to update internship");
    }
  };

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Edit Internship</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="Internship Title"
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
          placeholder="Stipend"
          className="w-full border p-3 rounded"
          value={form.stipend}
          onChange={(e) =>
            setForm({ ...form, stipend: e.target.value })
          }
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
