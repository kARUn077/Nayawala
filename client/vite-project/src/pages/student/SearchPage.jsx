import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Showing results for{" "}
          <span className="font-semibold text-indigo-700 dark:text-indigo-400 italic">
            "{query}"
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Filter handleFilterChange={handleFilterChange} />

        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            <div className="space-y-6">
              {data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] dark:bg-transparent p-6 text-center">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-extrabold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        No Courses Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
        We couldn't find anything matching your search.
      </p>
      <Link to="/">
        <Button variant="default" className="rounded-full px-6">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm animate-pulse bg-white dark:bg-gray-900 mb-4">
      <div className="h-32 w-full md:w-64 rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-4 w-1/3 rounded" />
        <Skeleton className="h-6 w-24 mt-2 rounded" />
      </div>

      <div className="hidden md:flex flex-col items-end justify-between">
        <Skeleton className="h-6 w-12 rounded" />
      </div>
    </div>
  );
};
