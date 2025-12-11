import { apiSlice } from "./apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ⭐ GET ALL COURSES (PUBLIC)
    getCourses: builder.query({
      query: () => "/courses",
      transformResponse: (res) => res.courses || [],
      providesTags: ["Courses"],
    }),

    // ⭐ GET SINGLE COURSE BY ID
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      transformResponse: (res) => res.course || null,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),

    // ⭐ ADD A NEW COURSE (EMPLOYER)
    postCourse: builder.mutation({
      query: (courseData) => ({
        url: "/employer/post-course",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Courses"],
    }),

    // ⭐ GET COURSES CREATED BY EMPLOYER
    getMyCourses: builder.query({
      query: () => "/employer/my-courses",
      transformResponse: (res) => res.courses || [],
      providesTags: ["Courses"],
    }),

    // ⭐ UPDATE COURSE BY EMPLOYER
    updateCourse: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/employer/course/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Courses"],
    }),

    // ⭐ DELETE COURSE BY EMPLOYER
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/employer/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  usePostCourseMutation,
  useGetMyCoursesQuery,
  useUpdateCourseMutation,     // 👈 NEW
  useDeleteCourseMutation,     // 👈 NEW
} = courseApi;
