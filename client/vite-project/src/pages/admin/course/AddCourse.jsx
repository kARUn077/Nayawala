import { Button } from "@/components/ui/button";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();

  const getSelectedCategory = (value) => setCategory(value);

  const createCourseHandler = async () => {
    if (!Title || !category) {
      toast.warning("Please fill in both title and category");
      return;
    }
    await createCourse({ Title, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-4 md:mx-10 py-6 text-gray-800 dark:text-white transition-colors duration-300">
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create a New Course</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Start building your course by providing a title and selecting a category.
        </p>
      </div>

      <div className="space-y-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#101010] dark:via-[#1a1a1a] dark:to-[#121212] p-6 rounded-2xl shadow-lg border border-blue-200 dark:border-white/10 transition">
        <div>
          <Label className="text-sm font-semibold">Course Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Mastering Fullstack Development"
            className="mt-2 dark:bg-[#1f1f1f] dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <Label className="text-sm font-semibold">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-full md:w-[280px] mt-2 dark:bg-[#1f1f1f] dark:border-gray-600">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#2a2a2a] dark:text-white">
              <SelectGroup>
                <SelectLabel>Available Categories</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Node Js">Node Js</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 items-center">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/course")}
            className="hover:bg-blue-100 dark:hover:bg-white/10 transition"
          >
            Back
          </Button>
          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-purple-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
