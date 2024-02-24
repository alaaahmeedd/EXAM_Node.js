import jwt from "jsonwebtoken"
import { AppError } from "../utils/AppError.js"
// middleware for check if user login or not
export const auth=async(req,res,next)=>{
jwt.verify(req.header('token'),process.env.JWT_Key,(err,decoded)=>{
if(err) return next(new AppError('you must login',401))
req.user=decoded
next()
})

}