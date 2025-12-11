// src/redux/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // <--- your backend base URL
    prepareHeaders: (headers) => {
      // IMPORTANT FIX 🚨
      // look for employerToken FIRST and fallback to others
      const token =
        localStorage.getItem("employerToken") || // employer
        localStorage.getItem("adminToken") || // admin
        localStorage.getItem("employeeToken") || // employee
        localStorage.getItem("token"); // user

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  // IMPORTANT: include all tag types you are using in any API
  tagTypes: [
    "Jobs",
    "MyJobs",
    "Internships",
    "MyInternships",
    "Courses",
    "MyCourses",
  ],

  endpoints: () => ({}),
});
