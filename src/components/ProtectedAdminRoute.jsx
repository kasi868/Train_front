import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no login → send to home
  if (!token) return <Navigate to="/" replace />;

  // If user is not admin → send to home
  if (role !== "admin") return <Navigate to="/" replace />;

  return children;
}
