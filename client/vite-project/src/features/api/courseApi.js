import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_API = (import.meta.env.VITE_API_BASE_URL 
//   ? import.meta.env.VITE_API_BASE_URL 
//   : "http://localhost:8080") + "/api/v1/course/";

import { COURSE_API } from "./apibase";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  tagTypes: ["Refetch_creator_course", "Refetch_Lecture"],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ Title, category }) => ({
        url: "",
        method: "POST",
        body: { Title, category },
      }),
      invalidatesTags: ["Refetch_creator_course"],
    }),

    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        // Build query string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`
        console.log("Search Query URL:", queryString);
        // append cateogry 
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        // Append sortByPrice is available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        }
      }
    }),








    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_creator_course"],
    }),
    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),
    editCourse: builder.mutation({
      query: ({ formdata, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formdata, // ✅ This must be a true FormData object
      }),
      invalidatesTags: ["Refetch_creator_course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree }
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),

    //delete course
         deleteCourse: builder.mutation({
  query: (courseId) => ({
    url: `/${courseId}`, // NOT `/course/${courseId}`
    method: "DELETE",
    credentials: "include",
  }),
}),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetPublishedCourseQuery,
  useGetSearchCourseQuery,
  useDeleteCourseMutation

} = courseApi;
