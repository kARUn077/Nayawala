import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-6xl mx-auto pt-16 pb-24 px-4 md:px-8">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500">
        My Learning
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-10 text-lg font-medium">
        Continue your journey. Explore the courses you've enrolled in.
      </p>

      {/* Content */}
      <div>
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <div className="text-center text-xl font-semibold text-gray-500 dark:text-gray-400 mt-12">
            You are not enrolled in any course yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 shadow-lg animate-pulse"
      >
        <div className="w-full h-36 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 bg-gray-400/40 dark:bg-gray-600/40 rounded"></div>
          <div className="h-3 w-1/2 bg-gray-300/50 dark:bg-gray-700/40 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);
