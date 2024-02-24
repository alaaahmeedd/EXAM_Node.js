import { companyModel } from "../../dbConnection/models/company.model.js";
import { userModel } from "../../dbConnection/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "./catchError.js";


// middleware for check HR

const checkForHR=catchError(
async(req,res,next)=>{
let company=await userModel.findOne({_id:req.body.companyHRId})
if(company){
    if(company.role !=='Company_HR') return next(new AppError("you are not Company_HR "))
}else{next(new AppError("user not found",404))}
next()
}
)

// middleware check for companyName
const checkCompanyName = catchError(async (req, res, next) => {
    let company = await companyModel.findOne({ companyName: req.body.companyName });
    if (company) return next(new AppError("companyName  is already exist...", 409));
    next();
  });

// middleware check for companyEmail
  const checkCompanyEmail = catchError(async (req, res, next) => {
    let company = await companyModel.findOne({ companyEmail: req.body.companyEmail });
    if (company) return next(new AppError("companyEmail  is already exist...", 409));
    next();
  });
// middleware check for company owner
  const checkForCompanyOwner=async(req,res,next)=>{
    const userId=req.user.userID
    let user=await companyModel.findById(req.params.id)
    if(userId !== user.id) return next(new AppError("you are not owner",401))
    next()
  }

// middleware for check if company exist
  const findCompany=async(req,res,next)=>{
    let company=await companyModel.findOne({_id:req.params.id})
    if(!company) return next(new AppError("company not found",404))
    next()
  }


export {
checkForHR,
checkCompanyName,
checkCompanyEmail,
checkForCompanyOwner,
findCompany,

}