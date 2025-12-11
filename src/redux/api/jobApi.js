// src/redux/api/jobApi.js
import { apiSlice } from "./apiSlice";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // =============================
    // ⭐ PUBLIC — GET ALL JOBS
    // =============================
    getAllJobs: builder.query({
      query: () => "/employer/jobs",
      providesTags: ["Jobs"],
    }),

    // =============================
    // ⭐ PUBLIC — GET ALL INTERNSHIPS
    // =============================
    getAllInternships: builder.query({
      query: () => "/employer/internships",
      providesTags: ["Internships"],
    }),

    // =============================
    // ⭐ GET JOB DETAILS BY ID
    // (I keep it here in case you need it)
    // =============================
    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: (result, err, id) => [{ type: "Jobs", id }],
    }),

    // =============================
    // ⭐ EMPLOYER — POST JOB
    // =============================
    postJob: builder.mutation({
      query: (data) => ({
        url: "/employer/post-job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs", "MyJobs"],
    }),

    // =============================
    // ⭐ EMPLOYER — POST INTERNSHIP
    // (NOW SEPARATE ENDPOINT)
    // =============================
    postInternship: builder.mutation({
      query: (data) => ({
        url: "/employer/post-internship",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Internships", "MyInternships"],
    }),

    // =============================
    // ⭐ EMPLOYER — GET MY JOBS
    // =============================
    getMyJobs: builder.query({
      query: () => "/employer/my-jobs",
      providesTags: ["MyJobs"],
    }),

    // =============================
    // ⭐ EMPLOYER — GET MY INTERNSHIPS
    // =============================
    getMyInternships: builder.query({
      query: () => "/employer/my-internships",
      providesTags: ["MyInternships"],
    }),

  }),
});

export const {
  useGetAllJobsQuery,
  useGetAllInternshipsQuery,
  useGetJobByIdQuery,
  usePostJobMutation,
  usePostInternshipMutation,
  useGetMyJobsQuery,
  useGetMyInternshipsQuery
} = jobApi;
