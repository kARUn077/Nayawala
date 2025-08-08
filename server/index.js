import express from "express"
import connectDB from "./dataBase/dB.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import courseRoute from "./routes/course.route.js"
import UserRoute from "./routes/user.routes.js"
import mediaRoute from "./routes/media.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
dotenv.config({});
//database called
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    "http://localhost:5173",
     "https://learnfinity-tau.vercel.app" 
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// apis
app.use("/api/v1/user",UserRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/media",mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.get("/",(_,res)=>{
    res.status(200).json({
        success:true,
        message:"i m coming from backend beta bakchodi nahi"
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
