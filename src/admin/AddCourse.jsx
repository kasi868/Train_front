// src/admin/AddCourse.jsx
import React, { useState } from "react";
import { useCreateCourseMutation } from "../redux/api/courseApi";

export default function AddCourse() {
  const [createCourse] = useCreateCourseMutation();
  const [title, setTitle] = useState("");

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Course</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createCourse({ title });
          alert("Course Added!");
        }}
        className="space-y-3"
      >
        <input
          className="border p-3 w-full"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
