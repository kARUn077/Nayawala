import jwt from "jsonwebtoken"

const isAuthenticated = async(req,res,next)=>{
    try {
        //console.log("req aaai")
        const token = await req.cookies.token;
        // console.log(token)
        if(!token){
            return res.status(401).json({
                message:"Unathorised",
                success: false
            })
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                success : false,
            })
        }
        req.id = decode.userId
        next();
    } catch (error) {
        console.log(error);
    }
}

export default isAuthenticated