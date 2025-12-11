// src/admin/AddInternship.jsx
import React, { useState } from "react";
import { useCreateInternshipMutation } from "../redux/api/internApi";

export default function AddInternship() {
  const [createInternship] = useCreateInternshipMutation();
  const [name, setName] = useState("");

  async function submit(e) {
    e.preventDefault();
    await createInternship({ name });
    alert("Internship Added!");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Internship</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="border p-3 w-full"
          placeholder="Internship Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
