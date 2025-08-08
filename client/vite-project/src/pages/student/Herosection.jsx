import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#4f46e5] to-[#9333ea] dark:from-[#1e1b4b] dark:to-[#581c87] pt-32 pb-40 px-6 text-white overflow-hidden">
      {/* Inline keyframes for animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>

      {/* Soft glowing orbs */}
      <div className="absolute -top-20 -left-32 w-96 h-96 bg-purple-400 dark:bg-purple-800 rounded-full blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 dark:bg-indigo-900 rounded-full blur-[120px] opacity-25 animate-pulse" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Animated Heading */}
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-lg"
          style={{
            animation: "fadeInUp 1s ease-out forwards",
          }}
        >
          <span
            className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-transparent bg-clip-text"
            style={{
              animation: "gradientShift 6s ease-in-out infinite",
              backgroundSize: "200% 200%",
              display: "inline-block",
            }}
          >
            Welcome to Learnifinity
          </span>
        </h1>

        <p className="text-lg md:text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Step into a universe of <span className="font-semibold text-white">limitless knowledge</span>. With expert-crafted paths, real-world projects, and magical learning experiences, Learnifinity turns your curiosity into capability.
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses..."
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-100"
          />
          <Button
            type="submit"
            className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-3 rounded-r-full hover:bg-indigo-700 dark:hover:bg-indigo-800 transition"
          >
            Search
          </Button>
        </form>

        {/* Explore Button */}
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-indigo-600 dark:bg-indigo-700 text-white font-semibold rounded-full px-6 py-3 hover:bg-indigo-700 dark:hover:bg-indigo-800 transition"
        >
          Explore All Courses
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
