import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 mb-6">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-5 group"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-36 w-full md:w-56 object-cover rounded-lg border border-gray-300 dark:border-gray-600 group-hover:scale-105 transition-transform duration-300"
        />

        <div className="flex flex-col justify-between flex-1">
          <div className="space-y-2">
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              {course.Title}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {course.subTitle}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Instructor:{" "}
              <span className="font-semibold text-indigo-700 dark:text-indigo-400">
                {course.creator?.name}
              </span>
            </p>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full w-fit">
              {course.courseLevel}
            </Badge>
          </div>

          <div className="mt-4 text-lg font-bold text-indigo-700 dark:text-indigo-400">
            ₹{course.price}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
