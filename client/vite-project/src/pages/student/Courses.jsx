import React from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-16 text-xl font-semibold">
        Something went wrong while loading the courses.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#f0fdf4] to-[#e0f2fe] dark:from-[#0f172a] dark:to-[#1e293b] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-12 tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
          Explore Our Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course) => (
                <Course key={course._id} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl overflow-hidden transform hover:scale-[1.02] transition duration-300">
      <Skeleton className="w-full h-40 bg-gray-200 dark:bg-slate-700" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4 rounded-md bg-gray-300 dark:bg-slate-600" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-gray-300 dark:bg-slate-600" />
          <Skeleton className="h-4 w-24 rounded bg-gray-300 dark:bg-slate-600" />
        </div>
        <Skeleton className="h-5 w-1/3 rounded bg-gray-300 dark:bg-slate-600" />
      </div>
    </div>
  );
};
