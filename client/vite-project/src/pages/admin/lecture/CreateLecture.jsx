// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   useCreateLectureMutation,
//   useGetCourseLectureQuery,
// } from "@/features/api/courseApi";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import Lecture from "./Lecture";

// const CreateLecture = () => {
//   const [lectureTitle, setLectureTitle] = useState("");
//   const navigate = useNavigate();
//   const params = useParams();
//   const courseId = params.courseId;

//   const [createLecture, { data, isLoading, isSuccess, error }] =
//     useCreateLectureMutation();

//   const {
//     data: lectureData,
//     isLoading: lectureLoading,
//     isError: lectureError,
//     refetch
//   } = useGetCourseLectureQuery(courseId);

//   const createLectureHandler = async () => {
//     await createLecture({ lectureTitle, courseId });
//   };

//   // console.log(lectureData)
//   useEffect(() => {
//     if (isSuccess) {
//       refetch();
//       toast.success(data.message);
//     }
//     if (error) {
//       toast.error(error.message);
//     }
//   }, [isSuccess, error]);
//   return (
//     <div className="flex-1 mx-10">
//       <div className="mb-4">
//         <h1 className="font-bold text-xl">
//           Lets add Lecture,add some basic details for your new course
//         </h1>
//         <p>
//           Add engaging lecture content to enhance your course. Enter the lecture title below and submit to include it in your curriculum.
//         </p>
//       </div>
//       <div className="space-y-4">
//         <div>
//           <Label>LectureTitle</Label>
//           <Input
//             type="text"
//             name="lectureTitle"
//             value={lectureTitle}
//             onChange={(e) => setLectureTitle(e.target.value)}
//             placeholder="Your Course Name"
//           />
//         </div>
//         <div className="flex gap-2 items-center">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/admin/course/courseId")}
//           >
//             Back to course
//           </Button>
//           <Button disabled={isLoading} onClick={createLectureHandler}>
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please Wait
//               </>
//             ) : (
//               "Create Lecture"
//             )}
//           </Button>
//         </div>
//         <div className="mt-10">
//           {lectureLoading ? (
//             <p>Loading lecture...</p>
//           ) : lectureError ? (
//             <p>Failed to load lectures</p>
//           ) : lectureData.lectures.length === 0 ? (
//             <p>No lecture available</p>
//           ) : (
//             lectureData.lectures.map((lecture, index) => (
//               <Lecture
//                 key={lecture._id}
//                 lecture={lecture}
//                 courseId={courseId}
//                 index={index}
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateLecture;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-auto max-w-3xl px-6 py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Add a New Lecture
        </h1>
        <p className="text-slate-500 dark:text-zinc-400">
          Add engaging lecture content to enhance your course. Enter the lecture title below and submit to include it in your curriculum.
        </p>
      </div>

      {/* Form Section */}
      <div className="space-y-6 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md border border-slate-200 dark:border-zinc-700">
        <div>
          <Label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
            Lecture Title
          </Label>
          <Input
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Enter lecture title"
            className="mt-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-center">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
            className="border border-slate-300 dark:border-zinc-600 text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            Back to course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>

      {/* Lecture List Section */}
      <div className="mt-10 space-y-3">
        {lectureLoading ? (
          <p className="text-slate-500">Loading lectures...</p>
        ) : lectureError ? (
          <p className="text-red-500">Failed to load lectures</p>
        ) : lectureData.lectures.length === 0 ? (
          <p className="text-slate-500">No lectures available</p>
        ) : (
          lectureData.lectures.map((lecture, index) => (
            <Lecture
              key={lecture._id}
              lecture={lecture}
              courseId={courseId}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CreateLecture;

