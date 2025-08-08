import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteVideo } from "../utils/cloudinary.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {

    try {
        const { Title, category } = req.body;
        console.log(req.id)
        if (!Title || !category) {
            console.log(Title, category);
            return res.status(400).json({
                message: "Please fill in all fields"
            })
        }
        const course = await Course.create({
            Title,
            category,
            creator: req.id
            
        });

        return res.status(201).json({
            course,
            message: "course created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to create course'
        })
    }
}

export const searchCourse = async (req,res) => {
    try {
        const {query = "", categories = [], sortByPrice =""} = req.query;
        console.log(categories);
        
    let parsedCategories = categories;
    if (typeof categories === "string") {
      parsedCategories = categories.split(",");
    }
        
        // create search query
        const searchCriteria = {
            isPublished:true,
            $or:[
                {Title: {$regex:query, $options:"i"}},
                {subTitle: {$regex:query, $options:"i"}},
                {category: {$regex:query, $options:"i"}},
            ]
        }

        // if categories selected
        if(parsedCategories.length > 0) {
            searchCriteria.category = {$in: parsedCategories};
        }

        // define sorting order
        const sortOptions = {};
        if(sortByPrice === "low"){
            sortOptions.price = 1;//sort by price in ascending
        }else if(sortByPrice === "high"){
            sortOptions.price = -1; // descending
        }
      console.log("Parsed Categories:", parsedCategories);
       console.log("Sort Option:", sortByPrice);
        let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOptions);

        return res.status(200).json({
            success:true,
            courses: courses || []
        });

    } catch (error) {
        console.log(error);
        
    }
}

export const getAdminCourses = async (req, res) => {
    try {
        const adminId = req.id;
        if (!adminId) {
            return res.status(400).json({
                message: "Please login to access this route"
            })
        }

        const courses = await Course.find({ creator: adminId })
        if (!courses) {
            return res.status(404).json({
                courses: [],
                message: "Course not Found"
            })
        };

        return res.status(200).json({
            courses,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Failed to create course'
        })
    }
}

export const editCourse = async (req, res) => {
    console.log("User ID:", req.id);
    console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  console.log("Course ID:", req.params.courseId);
    try {
        const courseId = req.params.courseId
        const { Title, subTitle, description, category, price, courseLevel } = req.body;
       // console.log(Title, subTitle, description, category, price, courseLevel)
        const thumbnail = req.file;

        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                message: "course not found"
            })
        }
         let courseThumbnail;
        if (thumbnail) {
             console.log("Uploading new thumbnail...");
            // Remove old thumbnail if it exists
               if(course.courseThumbnail){
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId); // delete old image
            }

           // upload a thumbnail on clourdinary
            courseThumbnail = await uploadMedia(thumbnail.path)
            
        }
        

       const updateData = {Title, subTitle, description, category, courseLevel, price, courseThumbnail:courseThumbnail?.secure_url};

        course = await Course.findByIdAndUpdate(courseId, updateData, {new:true});
        console.log("Final updated course:", course);

        return res.status(200).json({
            course,
            message: "Course updated successfully"
        })
    } catch (error) {
          console.error("Error in editCourse:", error); // Show actual reason
    return res.status(500).json({
        message: "Failed to update course",
        error: error.message
    });
    }
}

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "course not found"
            })
        }

        return res.status(200).json({
            course,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get course by id"
        })
    }
}

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Please provide lecture title"
            })
        }

        const lecture = await Lecture.create({ lectureTitle })

        const course = await Course.findById(courseId)

        if (course) {
            course.lectures.push(lecture._id);
            await course.save()
        }

        return res.status(201).json({
            lecture,
            message: "lecture created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to create lecture"
        })
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate("lectures");
        if (!course) {
            return res.status(400).json({
                message: "Course not found"
            })
        }

        return res.status(200).json({
            lectures: course.lectures
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to get course lecture"
        })
    }
}

export const editLecture = async (req, res) => {
    console.log("Incoming edit data:", req.body);
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;
        const { courseId, lectureId } = req.params

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(400).json({
                message: "Lecture not found"
            })
        }

        if (lectureTitle) lecture.lectureTitle = lectureTitle
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
        lecture.isPreviewFree = isPreviewFree;
        console.log("To be saved:", {
  title: lectureTitle,
  url: videoInfo?.videoUrl,
  id: videoInfo?.publicId
});
 const updated = await lecture.save();
console.log("After update:", updated);
        await lecture.save()

        // push lecture id in the course if it not present 
        const course = await Course.findById(courseId);
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        }

        return res.status(200).json({
            message: "Lecture updated successfully",
            lecture
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to edit Lecture"
        })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        const lecture = await Lecture.findByIdAndDelete(lectureId);

        if (lecture.publicId) {
            await deleteVideo(lecture.publicId);
        }

        // remove the lecture reference from the associated lecture
        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        )

        return res.status(200).json({
            message: "Lecture removed successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to remove Lecture"
        })
    }
}

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found"
            })
        }
        return res.status(200).json({
            lecture
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed to get Lecture"
        })
    }
}

// publish unpublish course logic

export const togglePublishCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const {publish} = req.query; // true, false
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:"Course not found!"
            });
        }
        // publish status based on the query paramter
        course.isPublished = publish === "true";
        await course.save();

        const statusMessage = course.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            message:`Course is ${statusMessage}`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to update status"
        })
    }
}

export const getPublishedCourse = async (_,res) => {
    try {
        const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"});
        if(!courses){
            return res.status(404).json({
                message:"Course not found"
            })
        }
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Failed to get published courses"
        })
    }
}


//Remove course logic
export const deleteCourse = async (req, res) => {
    try {
        const {courseId} = req.params;

        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Optional: Check if the logged-in user is the creator
        if (course.creator.toString() !== req.id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this course"
            });
        }

        // Delete the course
        await course.deleteOne();

        return res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to delete course"
        });
    }
};