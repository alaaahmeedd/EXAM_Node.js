import { userModel } from "../../dbConnection/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "./catchError.js";
// middleware for check if email exist
const checkEmail = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) return next(new AppError("email  is already exist...", 409));
  next();
});

// middleware for check if mobileNumber exist
const checkMobileNumber = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ mobileNumber: req.body.mobileNumber });
  if (user) return next(new AppError(" mobileNumber is already exist..."), 409);
  next();
});

// middleware for checkUser is exist 
 const findUser=async(req,res,next)=>{
  let user=await userModel.findOne({_id:req.params.id})
  if(!user) return next(new AppError("user not found",404))
  next()
}
// middleware for checkUser if owner 
 const checkOwner=async(req,res,next)=>{
  const userId=req.user.userID
  let user=await userModel.findById(req.params.id)
  if(userId !== user.id) return next(new AppError("you are not owner",401))
  next()
}


 const findRecoveryEmail=async(req,res,next)=>{
  let user=await userModel.findOne({recoveryEmail:req.body.recoveryEmail})
  if(!user) return next(new AppError("recoveryEmail not found",404))
  next()
}



export { checkEmail, checkMobileNumber,
findUser,
checkOwner,
findRecoveryEmail

};
