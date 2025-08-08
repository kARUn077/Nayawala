// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import RichtextEditor from "@/components/ui/RichtextEditor";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseApi";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";

// const CourseTab = () => {
//   const isPublised = false;
//   const params = useParams();
//   const courseId = params.courseId;

//   const [input, setInput] = useState({
//     Title: "",
//     subTitle: "",
//     description: "",
//     category: "",
//     price: "",
//     courseLevel: "",
//     courseThumbnail: "",
//   });
//   const [preview, setPreview] = useState("");
//   // fetch course data
//   const { data: courseData, isLoading: courseLoading ,refetch} = useGetCourseByIdQuery(courseId)


//   //console.log(courseData)
//   useEffect(() => {
//     if (courseData?.course) {
//       const course = courseData.course
//       setInput({
//         Title: course.Title,
//         subTitle: course.subTitle,
//         description: course.description,
//         category: course.category,
//         price: course.price,
//         courseLevel: course.courseLevel,
//         courseThumbnail: "",
//       })
//     }
//   }, [courseData])

//   const navigate = useNavigate();
//   const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();

//   const changeHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({ ...input, [name]: value });
//   };

//   const selectCategory = (value) => {
//     setInput({ ...input, category: value });
//   }

//   // get file
//   const selectThumbnail = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setInput({ ...input, courseThumbnail: file })
//       const fileReader = new FileReader();
//       fileReader.onloadend = () => setPreview(fileReader.result);
//       fileReader.readAsDataURL(file);
//     }
//   }
//   const selectCourseLevel = (value) => {
//     setInput({ ...input, courseLevel: value });
//   }

//   const updateHandler = async () => {
//     console.log("Input State Before Update:", input);
//     const formdata = new FormData();

//     formdata.append("title", input.Title);
//     formdata.append("subTitle", input.subTitle);
//     formdata.append("description", input.description);
//     formdata.append("category", input.category);
//     formdata.append("price", input.price);
//     formdata.append("courseLevel", input.courseLevel);
//     formdata.append("courseThumbnail", input.courseThumbnail);

//     await editCourse({ formdata, courseId });
//   }

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success(data.message || "Course updated")
//     }
//     if (error) {
//       toast.error(error.data.message || "Error updating course")
//     }
//   }, [isSuccess, error])
//   return (
//     <Card>
//       <CardHeader className="flex flex-row justify-between">
//         <div>
//           <CardTitle>Basic Course Information</CardTitle>
//           <CardDescription>
//             Make Changes to your courses here. Click save when you're done.
//           </CardDescription>
//         </div>
//         <div className="space-x-2">
//           <Button variant="outline">
//             {isPublised ? "Unpublish" : "Publish"}
//           </Button>
//           <Button>Remove Course</Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4 mt-5">
//           <div>
//             <Label>Title</Label>
//             <Input
//               type="text"
//               name="Title"
//               value={input.Title}
//               onChange={changeHandler}
//               placeholder="Ex. Nodejs dev"
//             />
//           </div>
//           <div>
//             <Label> Subtitle</Label>
//             <Input
//               type="text"
//               name="subTitle"
//               value={input.subTitle }
//               onChange={changeHandler}
//               placeholder="Ex. Become pro web developer"
//             />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <RichtextEditor input={input} setInput={setInput} />
//           </div>
//           <div className="flex items-center gap-5">
//             <div>
//               <Label>Category</Label>
//               <Select onChange={selectCategory}>
//                 <SelectTrigger className="w-[280px]">
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Category</SelectLabel>
//                     <SelectItem value="Next JS">Next JS</SelectItem>
//                     <SelectItem value="Data Science">Data Science</SelectItem>
//                     <SelectItem value="Frontend Developer">
//                       Frontend Developer
//                     </SelectItem>
//                     <SelectItem value="JavaScript">JavaScript</SelectItem>
//                     <SelectItem value="Node Js">Node Js</SelectItem>
//                     <SelectItem value="Data Analyst">Data Analyst</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Course Level</Label>
//               <Select onChange={selectCourseLevel}>
//                 <SelectTrigger className="w-[280px]">
//                   <SelectValue placeholder="Select a course level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel> Course Level</SelectLabel>
//                     <SelectItem value="Beginner">Beginner</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Advance">Advance</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Price in (INR)</Label>
//               <Input
//                 type="number"
//                 name="price"
//                 value={input.price}
//                 onChange={changeHandler}
//                 placeholder="1000"
//                 className="w-fit"
//               />
//             </div>
//           </div>
//           <div>
//             <Label>Course Thumbnail</Label>
//             <Input type="file" accept="image/*" className="w-fit" onChange={selectThumbnail} />{
//               preview && (<img src={preview} className="w-64 my-2" />)
//             }
//           </div>
//           <div className="space-x-4">
//             <Button variant="outline" onClick={() => navigate("/admin/course")}>Cancel</Button>
//             <Button disabled={isLoading} onClick={updateHandler}>
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 <>Save</>
//               )}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseTab;



//new updated code
import RichTextEditor from "@/components/ui/RichTextEditor.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();



  const [deleteCourse, { isLoading: deleteLoading }] = useDeleteCourseMutation();

  const removeCourseHandler = async () => {
   

    try {
      const res = await deleteCourse(courseId);
      if (res?.data?.message) {
        toast.success(res.data.message);
        navigate("/admin/course");
      } else {
        toast.error("Failed to delete course");
      }
    } catch (err) {
      toast.error("Error deleting course");
    }
  };

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.Title,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.price,
        courseThumbnail: course.courseThumbnail,
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => setInput({ ...input, category: value });
  const selectCourseLevel = (value) => setInput({ ...input, courseLevel: value });

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("Title", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("price", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formdata: formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const res = await publishCourse({ courseId, query: action });
      if (res.data) {
        refetch();
        toast.success(res.data.message);
      }
    } catch {
      toast.error("Failed to publish/unpublish course");
    }
  };

  useEffect(() => {
    if (isSuccess) toast.success(data?.message || "Course updated");
    if (error) toast.error(error?.data?.message || "Failed to update course");
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card className="bg-white dark:bg-[#1a1a1a] shadow-xl border border-gray-200 dark:border-white/10">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <CardTitle className="text-2xl">Basic Course Information</CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            onClick={() =>
              publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")
            }
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button
            variant="destructive"
            disabled={deleteLoading}
            onClick={removeCourseHandler}
          >
            {deleteLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              "Remove Course"
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-5 mt-6">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack Developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Learn fullstack dev from scratch"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {["Next JS", "Data Science", "Frontend Development", "Fullstack Development", "MERN Stack Development", "Javascript", "Python", "Docker", "MongoDB", "Backend Development", "HTML"]
                      .map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="e.g. 499"
              />
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={selectThumbnail}
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Thumbnail Preview"
                className="mt-4 w-64 rounded-lg shadow-md border border-gray-200 dark:border-white/10"
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              onClick={() => navigate("/admin/course")}
              variant="outline"
              className="hover:bg-gray-100 dark:hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={updateCourseHandler}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
