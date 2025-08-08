import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({});

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

    return res.status(201).cookie("token", token, 
        { httpOnly: true,
            //  sameSite: 'strict',
            //  secure: process.env.NODE_ENV === "production" ? true : false,
              sameSite: 'none',  // <-- this is required for cross-site cookies
               secure: true,      // <-- must be true when sameSite is 'none'
             maxAge: 24 * 60 * 60 * 1000 })
        .json({
        success: true,
        message,
        user
    });
}


// import jwt from "jsonwebtoken";

// export const generateToken = (res, user, message) => {
//   const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//     expiresIn: "1d",
//   });

//   return res
//     .status(200)
//     .cookie("token", token, {
//       httpOnly: true,
//       sameSite: "Strict", // "None" allows cross-site cookies, needed for Vercel frontend + Render backend
//       secure: process.env.NODE_ENV === "production", // ✅ crucial for HTTPS
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     })
//     .json({
//       success: true,
//       message,
//       user,
//     });
// };