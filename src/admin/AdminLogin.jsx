import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", form);

    if (!res.data.success) return alert(res.data.message);

    if (res.data.role !== "admin") {
      return alert("You are not an admin!");
    }

    localStorage.setItem("adminToken", res.data.token);
    nav("/admin/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 border rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-indigo-600 text-white py-3 rounded mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
