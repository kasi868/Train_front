import React from "react";
import {
  useGetMyCoursesQuery,
  useDeleteCourseMutation,
} from "../redux/api/employerApi";
import { useNavigate } from "react-router-dom";

export default function MyCourses() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  if (isLoading)
    return <div className="p-10 text-lg">Loading courses...</div>;

  // ⭐ FIXED — data is already an array
  const courses = data || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await deleteCourse(id).unwrap();
      alert("Course deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">My Courses</h2>

      {courses.length === 0 ? (
        <div className="text-slate-600 text-lg">No courses posted yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div
              key={c._id}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-600">Duration: {c.duration}</p>
              <p className="mt-2 text-sm text-indigo-600 font-medium">
                Price: ₹{c.price}
              </p>

              {/* ⭐ SHOW DESCRIPTION */}
              <p className="mt-3 text-sm text-slate-600">
                {c.description || "No description"}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/employer/edit-course/${c._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
