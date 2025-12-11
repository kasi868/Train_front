// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// USER LOGIN
import { useLoginUserMutation } from "../redux/api/authApi";

// EMPLOYER LOGIN
import { useLoginEmployerMutation } from "../redux/api/employerApi";

export default function Login() {
  const navigate = useNavigate();

  const [loginUser, { isLoading: loadingUser }] = useLoginUserMutation();
  const [loginEmployer, { isLoading: loadingEmployer }] =
    useLoginEmployerMutation();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    // TRY USER LOGIN FIRST
    try {
      const res = await loginUser(form).unwrap();

      if (res.success) {
        // store user login token
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("role", res.user.role);

        if (res.user.role === "admin") navigate("/admin");
        else navigate("/");

        return;
      }
    } catch (err) {
      console.log("User login failed, trying employer...");
    }

    // TRY EMPLOYER LOGIN
    try {
      const res = await loginEmployer(form).unwrap();

      if (!res.success) return alert(res.message);

      // IMPORTANT 🚨 store employer token SEPARATELY
      localStorage.setItem("employerToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("role", res.user.role);

      navigate("/employer");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleLogin}>
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
          disabled={loadingUser || loadingEmployer}
          className="w-full bg-indigo-600 text-white py-3 rounded mt-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          {loadingUser || loadingEmployer ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
