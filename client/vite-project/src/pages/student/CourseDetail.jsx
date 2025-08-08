// import BuyCourseButton from "@/components/ui/BuyCourseButton";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import React from "react";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";

// const CourseDetail = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const navigate = useNavigate();
//   const { data, isLoading, isError } =
//     useGetCourseDetailWithStatusQuery(courseId);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (isError) return <h1>Failed to load course details</h1>;

//   const { course, purchased } = data;
//   console.log(purchased);

//   const handleContinueCourse = () => {
//     if(purchased){
//       navigate(`/course-progress/${courseId}`)
//     }
//   }

//   return (
//     <div className="space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">
//             {course?.courseTitle}
//           </h1>
//           <p className="text-base md:text-lg">Course Sub-title</p>
//           <p>
//             Created By{" "}
//             <span className="text-[#C0C4FC] underline italic">
//               {course?.creator.name}
//             </span>
//           </p>
//           <div className="flex items-center gap-2 text-sm">
//             <BadgeInfo size={16} />
//             <p>Last updated {course?.createdAt.split("T")[0]}</p>
//           </div>
//           <p>Students enrolled: {course?.enrolledStudents.length || 0}</p>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: course.description }}
//           />
//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>4 lectures</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p>{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height={"100%"}
//                   url={course.lectures[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1>Lecture title</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;

import BuyCourseButton from "@/components/ui/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center mt-10 text-lg font-semibold">Loading...</h1>;
  if (isError) return <h1 className="text-center mt-10 text-lg font-semibold text-red-500">Failed to load course details</h1>;

  const { course, purchased } = data;
  const lectures = Array.isArray(course?.lectures) ? course.lectures : [];

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5 pb-10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-3xl md:text-4xl">{course?.Title || "Untitled Course"}</h1>
          <p className="text-lg opacity-90">{course?.subTitle || "Course subTitle"}</p>
          <p>
            Created By{" "}
            <span className="text-yellow-200 underline italic font-medium">
              {course?.creator?.name || "Unknown"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <BadgeInfo size={16} />
            <p>
              Last updated{" "}
              {course?.createdAt ? course.createdAt.split("T")[0] : "N/A"}
            </p>
          </div>
          <p className="text-sm">Students enrolled: {Array.isArray(course?.enrolledStudents) ? course.enrolledStudents.length : 0}</p>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Panel */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course?.description || "" }} />
          </div>

          <Card className="bg-white dark:bg-[#1c1c1c] shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Course Content</CardTitle>
              <CardDescription className="text-gray-500">{lectures.length} lectures included</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-gray-800 dark:text-gray-200">
                  <span>{purchased ? <PlayCircle size={16} /> : <Lock size={16} />}</span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/3">
          <Card className="bg-white dark:bg-[#1c1c1c] shadow-xl">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video rounded overflow-hidden mb-4">
                {lectures[0]?.videoUrl && (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={lectures[0].videoUrl}
                    controls
                  />
                )}
              </div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">{lectures[0]?.lectureTitle || "Lecture title"}</h2>
              <Separator className="my-3" />
              <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                ₹{course.price || "Free"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button
                  onClick={handleContinueCourse}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:brightness-110"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;