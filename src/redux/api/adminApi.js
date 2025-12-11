import { apiSlice } from "./apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ⭐ STATS
    getStats: builder.query({
      query: () => "/admin/stats",
      transformResponse: (res) => res.stats,
    }),

    // ⭐ USERS
    getUsers: builder.query({
      query: () => "/admin/users",
      transformResponse: (res) => res.users,
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // ⭐ EMPLOYERS
    getPendingEmployers: builder.query({
      query: () => "/admin/employers/pending",
      transformResponse: (res) => res.employers,
      providesTags: ["Employers"],
    }),
    approveEmployer: builder.mutation({
      query: (id) => ({
        url: `/admin/employers/approve/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Employers"],
    }),
    rejectEmployer: builder.mutation({
      query: (id) => ({
        url: `/admin/employers/reject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employers"],
    }),

    // ⭐ JOBS
    getJobsAdmin: builder.query({
      query: () => "/admin/jobs",
      transformResponse: (res) => res.jobs,
      providesTags: ["Jobs"],
    }),
    deleteJobAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // ⭐ INTERNSHIPS
    getInternshipsAdmin: builder.query({
      query: () => "/admin/internships",
      transformResponse: (res) => res.internships,
      providesTags: ["Internships"],
    }),
    deleteInternshipAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/internships/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Internships"],
    }),

    // ⭐ COURSES
    getCoursesAdmin: builder.query({
      query: () => "/admin/courses",
      transformResponse: (res) => res.courses,
      providesTags: ["Courses"],
    }),
    deleteCourseAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetStatsQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetPendingEmployersQuery,
  useApproveEmployerMutation,
  useRejectEmployerMutation,
  useGetJobsAdminQuery,
  useDeleteJobAdminMutation,
  useGetInternshipsAdminQuery,
  useDeleteInternshipAdminMutation,
  useGetCoursesAdminQuery,
  useDeleteCourseAdminMutation,
} = adminApi;
