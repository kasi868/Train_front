// src/redux/api/authApi.js
import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getProfileById: builder.query({
      query: (id) => `/auth/profile/${id}`,
      providesTags: (result, error, id) => [{ type: "Profile", id }],
    }),
    // update via profile route uses multipart/form-data — better to use profileApi for that,
    // but we'll include a json update via auth route if needed.
    updateProfileJson: builder.mutation({
      query: (data) => ({
        url: "/auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetProfileByIdQuery,
  useUpdateProfileJsonMutation,
} = authApi;
