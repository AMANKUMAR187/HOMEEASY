import { catchAsyncError} from "../middleware/catchasyncerror.js";
import ErrorHandler from "../middleware/error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = catchAsyncError(async (req,res,next)=>{
    console.log("isauth..");
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("user is not authenticated",400));
    }
    const decode  = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    next();
})

