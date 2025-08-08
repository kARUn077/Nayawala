import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditCourseMutation,
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "https://teach-dex.vercel.app/api/v1/media";

const LectureTab = () => {
  const params = useParams();
  const { courseId, lectureId } = params;

  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
       setBtnDisable(true);
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        console.log("Upload response:", res.data);


        if (res.data.success) {
          console.log(res.data);
          setUploadVideoInfo({
            videoUrl: res.data.data.secure_url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const handleFreeChange = async(e) =>{
    setIsFree(e.target.checked);
  }
  const editLectureHandler = async () => {

     // Block submission if video is uploading
  if (mediaProgress) {
    toast.error("Please wait until the new video is fully uploaded.");
    return;
  }
    const finalVideoInfo = uploadVideoInfo || {
    videoUrl: lecture?.videoUrl,
    publicId: lecture?.publicId,
  };

    if (!uploadVideoInfo?.videoUrl || !uploadVideoInfo?.publicId) {
    toast.error("Please upload a video before saving.");
    return;
  }

         console.log("Sending to editLecture:", {
    lectureTitle,
    videoInfo: finalVideoInfo,
    isPreviewFree: isFree,
    courseId,
    lectureId,
  });
    await editLecture({
      lectureTitle,
      videoInfo:finalVideoInfo,
      isPreviewFree:isFree,
      courseId,
      lectureId,
    });
  };

  const {data:lectureData} = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData ?.lecture;

 useEffect(() => {
  if (lecture) {
    setLectureTitle(lecture.lectureTitle);
    setIsFree(lecture.isPreviewFree);

    // ✅ Only set if video exists
    if (lecture.videoUrl && lecture.publicId) {
      setUploadVideoInfo({
        videoUrl: lecture.videoUrl,
        publicId: lecture.publicId,
      });
    } else {
      setUploadVideoInfo(null); // or keep previous upload data
    }
  }
}, [lecture]);
  const [removeLecture,{data: removeData,isLoading:removeLoading,isSuccess:removeSuccess}] = useRemoveLectureMutation();

  const removeLectureHadler = async() =>{
        await removeLecture(lectureId)
  }

  useEffect(() =>{
    if(removeSuccess){
        toast.success(removeData.message)
    }
  },[removeSuccess])
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);
  return (
    <Card>
      <CardHeader className="flex flex-col justify-between">
        <div>
          <CardTitle>Edit lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHadler}>
            {
                removeLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</> :
                <>Remove Lecture</>
            }
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="my-1">Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="ex.Introduction to Nodejs "
          />
        </div>
        <div className="my-5">
          <Label className="my-1">
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
            placeholder="ex.Introduction to Nodejs "
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
          checked={isFree}
          onCheckedChange={setIsFree}
          />
          <Label>Is this video Free</Label>
        </div>
        {
          <div className="my-4">
           {/* Show Uploading Status */}
  {mediaProgress && (
    <p className="text-yellow-600 text-sm mt-2">Uploading new video...</p>
  )}
            <Progress value={uploadProgress} />
            <p>{uploadProgress} % uploaded</p>
          </div>
        }
        <div>
          <Button onClick={editLectureHandler}>Update Document</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
