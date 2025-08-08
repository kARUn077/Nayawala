import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    subTitle:{
        type:String
    },
    description: {
        type: String,
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type:Number,
    },
    courseLevel:{
        type:String,
        enum:["Beginner","Medium","Advanced"],
    },
    enrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    courseThumbnail:{
        type:String
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    lectures:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture"
    }],
    isPublished:{
        type:Boolean,
        default:false
    }
    
},{timestamps: true});

export const Course = mongoose.model("Course",courseSchema);