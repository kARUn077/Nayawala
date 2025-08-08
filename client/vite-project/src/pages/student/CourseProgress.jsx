import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;

  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData?.message || "Course marked as complete");
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData?.message || "Course marked as incomplete");
    }
  }, [completedSuccess, inCompletedSuccess]);

  if (isLoading) return <p className="text-center py-10 text-lg">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;

  const initialLecture = currentLecture || (lectures.length > 0 ? lectures[0] : null);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Course Title & Completion Button */}
      <div className="flex justify-between items-center flex-wrap mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className="mt-4 md:mt-0"
        >
          {completed ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Completed
            </span>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Player */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
          {initialLecture ? (
            <>
              <video
                key={initialLecture.videoUrl}
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full rounded-lg aspect-video mb-4"
                onPlay={() =>
                  handleLectureProgress(currentLecture?._id || initialLecture._id)
                }
              />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {`Lecture ${
                  lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture._id)) + 1
                }: ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
              </h2>
            </>
          ) : (
            <p className="text-center text-gray-500">No lectures available</p>
          )}
        </div>

        {/* Lecture Sidebar */}
        <div className="w-full md:w-[35%] space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Course Lectures</h3>
          <div className="overflow-y-auto max-h-[70vh] pr-2">
            {lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`cursor-pointer border ${
                  lecture._id === currentLecture?._id
                    ? "border-blue-500 bg-blue-50 dark:bg-gray-700"
                    : "hover:border-gray-400"
                } transition-all duration-200`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                      <CirclePlay className="text-gray-500" size={20} />
                    )}
                    <CardTitle className="text-base">{lecture.lectureTitle}</CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge variant="outline" className="bg-green-100 text-green-600">
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
