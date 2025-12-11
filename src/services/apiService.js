import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create API service
export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // change to your backend URL
    prepareHeaders: (headers) => {
      // You can add token here later if needed
      // headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // REGISTER USER
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

// Export hooks for components to use
export const { useRegisterUserMutation } = apiService;
