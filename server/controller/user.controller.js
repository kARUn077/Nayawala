import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

//  Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       
        //  Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //  Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        // Hash password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
             
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register user",
        });
    }
};

//  Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //  Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        //  Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        //  Compare hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        // Generate token and send response
        generateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
};
//Logout user

export const logout=async (_,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout",
        });
    }
}
export const getUserProfile=async (req,res)=>{
    try {
        const userId=req.id;
        const user=await User.findById(userId).select("-password").populate("enrolledCourses");;
        if(!user){
            return res.status(401).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Profile not found",
        });
    }
}
export const updateProfile=async (req,res)=>{
    try {
        const UserId=req.id;
        const {name}=req.body;
        const profilePhoto=req.file;
        const user=await User.findById(UserId);
        if(!user){
            return res.status(401).json({
                message:"User not found",
                success:false
            })
        }
        //extract public id of old image and delete if it is present
        if(user.photoUrl){
          const publicId=user.photoUrl.split("/").pop().split(".")[0];//extracting public id of image
          deleteMediaFromCloudinary(publicId);
        }
        //upload new updated
        const cloudResponse= await uploadMedia(profilePhoto.path);
        
        const {secure_url:photoUrl}=cloudResponse;
        const updatedData={name,photoUrl};

        const updatedUser=await User.findByIdAndUpdate(UserId,updatedData,{new:true}).select("-password");
        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully"
        })
    } catch (error) {
        console.log(error);
    }
}
