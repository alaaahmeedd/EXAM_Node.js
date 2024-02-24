import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    recoveryEmail: {
        type: String
    },
    DOB: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'Company_HR'],
        default:'user',
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    }
},{timestamps:true})

export const userModel=mongoose.model('user',userSchema)