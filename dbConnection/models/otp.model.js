import mongoose, { Types } from "mongoose";

const otpSchema=new mongoose.Schema({
    otpCode:{
    type:String,
    required:true
    }
})

export const otpModel=mongoose.model('otp',otpSchema)