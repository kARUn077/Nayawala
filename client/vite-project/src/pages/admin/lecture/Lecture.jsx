// import { Edit } from 'lucide-react'
// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const Lecture = ({lecture,courseId,index}) => {
//     const navigate = useNavigate();
//     const goToUpdateLecture = () =>{
//         navigate(`${lecture._id}`)
//     }
//   return (
//     <div className='flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2'>
//         <h1 className='font-bold text-gray-800 dark:text-gray-100'>Lecture -{index + 1}:{lecture.lectureTitle || "Untitled Lecture"}</h1>
//         <Edit  aria-label="Edit lecture" className='cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
//         size={20}
//         onClick={goToUpdateLecture}
//         />
//     </div>
//   )
// }

// export default Lecture

import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className="flex items-center justify-between bg-slate-100 dark:bg-zinc-800 px-4 py-3 rounded-lg border border-slate-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all">
      <h1 className="font-semibold text-slate-800 dark:text-white text-sm sm:text-base">
        Lecture {index + 1}: {lecture.lectureTitle}
      </h1>
      <Edit
        className="cursor-pointer text-slate-500 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        size={20}
        onClick={goToUpdateLecture}
      />
    </div>
  );
};

export default Lecture;

