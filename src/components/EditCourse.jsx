import React, { useEffect, useState } from "react";
import {
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
} from "../redux/api/courseApi";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetCourseByIdQuery(id);
  const [updateCourse] = useUpdateCourseMutation();

  const [form, setForm] = useState({
    title: "",
    duration: "",
    price: "",
    description: "",
  });

  // fill form when data arrives
  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        duration: data.duration,
        price: data.price,
        description: data.description,
      });
    }
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateCourse({ id, ...form }).unwrap();
      alert("Course updated successfully!");
      navigate("/employer/my-courses");
    } catch (err) {
      console.error(err);
      alert("Failed to update course");
    }
  };

  if (isLoading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Edit Course</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Duration"
          className="w-full border p-3 rounded"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
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
