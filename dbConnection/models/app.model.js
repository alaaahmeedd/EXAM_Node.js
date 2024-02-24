import mongoose from "mongoose";

const appSchema=new mongoose.Schema({
    jobId :{
    type:mongoose.Types.ObjectId,
    ref:'job'
    },
    userId :{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    userTechSkills:{
    type:String,
    required:true
    },
    userSoftSkills:{
        type:String,
    required:true},
    userResume:{
    type:String,
    enum:["pdf"],
    }
},{timestamps:true})

export const appModel=mongoose.model('app',appSchema)