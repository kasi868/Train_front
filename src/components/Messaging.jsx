import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:5000/api/auth/login", form);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      nav("/dashboard"); // redirect after login
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 border rounded mb-3"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border rounded mb-3"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 text-white py-3 rounded mt-2 hover:bg-indigo-700"
      >
        Login
      </button>
    </div>
  );
}
