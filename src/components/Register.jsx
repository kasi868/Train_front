// src/components/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form).unwrap();

      if (!res.success) {
        alert(res.message || "Registration failed");
        return;
      }

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 border rounded mb-3"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 rounded mt-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?
        <Link to="/login" className="text-indigo-600 ml-1">
          Login
        </Link>
      </p>
    </div>
  );
}
