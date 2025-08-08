import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error,
      isError,
      isSuccess: updateUserSuccess,
    },
  ] = useUpdateUserMutation();

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (updateUserSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error?.data?.message || error?.message || "Failed to update profile");
    }
  }, [error, updateUserData, updateUserSuccess, isError]);

  const user = data?.user;
  const enrolledCourses = user?.enrolledCourses || [];

  if (isLoading)
    return <div className="text-center py-20 text-xl font-semibold">Loading Profile...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-10 text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
        Your Profile
      </h1>

      {/* User Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white/80 dark:bg-gray-900/80 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 backdrop-blur">
        <Avatar className="h-36 w-36 border-4 border-pink-500 shadow-xl hover:scale-105 transition">
          <AvatarImage
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt="User"
            className="object-cover"
          />
          <AvatarFallback className="text-xl font-bold">CN</AvatarFallback>
        </Avatar>

        <div className="w-full space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-gray-700 dark:text-gray-200">
            <div>
              <h2 className="text-sm text-gray-500 dark:text-gray-400">Name</h2>
              <p className="text-lg font-semibold">{user?.name}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500 dark:text-gray-400">Email</h2>
              <p className="text-lg font-semibold">{user?.email}</p>
            </div>
            <div>
              <h2 className="text-sm text-gray-500 dark:text-gray-400">Role</h2>
              <p className="text-lg font-semibold uppercase">{user?.role}</p>
            </div>
          </div>

          {/* Edit Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 hover:bg-purple-100 dark:hover:bg-gray-800">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border-none p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Edit Profile</DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-400">
                  Update your name and profile picture.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Profile Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={onChangeHandler}
                    className="mt-1"
                  />
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  onClick={updateUserHandler}
                  disabled={updateUserIsLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Enrolled Courses
        </h2>
        {enrolledCourses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
