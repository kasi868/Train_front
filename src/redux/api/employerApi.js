// src/redux/api/employerApi.js
import { apiSlice } from "./apiSlice";

export const employerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ============================
    // ⭐ EMPLOYER LOGIN
    // ============================
    loginEmployer: builder.mutation({
      query: (credentials) => ({
        url: "/employer/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // ============================
    // ⭐ JOBS
    // ============================
    postJob: builder.mutation({
      query: (data) => ({
        url: "/employer/post-job",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MyJobs"],
    }),

    getMyJobs: builder.query({
      query: () => "/employer/my-jobs",
      transformResponse: (res) => res.jobs || [],
      providesTags: ["MyJobs"],
    }),

    getJobById: builder.query({
      query: (id) => `/employer/job/${id}`,
      providesTags: (result, error, id) => [{ type: "MyJobs", id }],
    }),

    updateJob: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/employer/job/${id}`,
        method: "PUT",
        body: patch,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MyJobs"],
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/employer/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyJobs"],
    }),

    // ============================
    // ⭐ INTERNSHIPS
    // ============================
    postInternship: builder.mutation({
      query: (data) => ({
        url: "/employer/post-internship",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MyInternships"],
    }),

    getMyInternships: builder.query({
      query: () => "/employer/my-internships",
      transformResponse: (res) => res.internships || [],
      providesTags: ["MyInternships"],
    }),

    getInternshipById: builder.query({
      query: (id) => `/employer/internship/${id}`,
      providesTags: (result, error, id) => [{ type: "MyInternships", id }],
    }),

    updateInternship: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/employer/internship/${id}`,
        method: "PUT",
        body: patch,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["MyInternships"],
    }),

    deleteInternship: builder.mutation({
      query: (id) => ({
        url: `/employer/internship/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyInternships"],
    }),

    // ============================
    // ⭐ COURSES
    // ============================
    postCourse: builder.mutation({
      query: (data) => ({
        url: "/employer/post-course",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",   // ⭐ FIXED HERE
        },
      }),
      invalidatesTags: ["MyCourses"],
    }),

    getMyCourses: builder.query({
      query: () => "/employer/my-courses",
      transformResponse: (res) => res.courses || [],   // ⭐ FIXED HERE
      providesTags: ["MyCourses"],
    }),

    getCourseById: builder.query({
      query: (id) => `/employer/course/${id}`,
      providesTags: (result, error, id) => [{ type: "MyCourses", id }],
    }),

    updateCourse: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/employer/course/${id}`,
        method: "PUT",
        body: patch,
        headers: {
          "Content-Type": "application/json",   // ⭐ FIXED HERE
        },
      }),
      invalidatesTags: ["MyCourses"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/employer/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyCourses"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useLoginEmployerMutation,

  usePostJobMutation,
  useGetMyJobsQuery,
  useGetJobByIdQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,

  usePostInternshipMutation,
  useGetMyInternshipsQuery,
  useGetInternshipByIdQuery,
  useUpdateInternshipMutation,
  useDeleteInternshipMutation,

  usePostCourseMutation,
  useGetMyCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = employerApi;
