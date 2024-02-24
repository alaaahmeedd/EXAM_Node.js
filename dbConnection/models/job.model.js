import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
jobTitle:{
type:String,
required:true
},
    jobLocation: {
        type: String,
        required: true
    },
    workingTime: {
        type: String,
        required: true
    },
    seniorityLevel: {
        type: String,
        enum:["Junior","Mid-Level","Senior","Team-Lead","CTO "],
        required: true
    },
    jobDescription: {
        type: String,
        required:true
    },
    addedBy : {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    technicalSkills:{
    type:String,
    required:true
    },
    softSkills:{
        type:String,
        required:true
        }
},{timestamps:true})

export const jobModel=mongoose.model('job',jobSchema)