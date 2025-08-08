import express from "express";
import upload from "../utils/multer.js";
import {register,login, getUserProfile, logout, updateProfile} from "../controller/user.controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import { uploadMedia } from "../utils/cloudinary.js";

const UserRoute=express.Router();

UserRoute.route("/register").post(register);
UserRoute.route("/login").post(login);
UserRoute.route("/profile").get(isAuthenticated,getUserProfile);
UserRoute.route("/logout").get(logout);
UserRoute.route("/profile/update").put(isAuthenticated,upload.single("profilePhoto"),updateProfile);

export default UserRoute;


