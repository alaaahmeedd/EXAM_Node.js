import { companyModel } from "../../dbConnection/models/company.model.js"
import { jobModel } from "../../dbConnection/models/job.model.js"
import { userModel } from "../../dbConnection/models/user.model.js"
import { AppError } from "../utils/AppError.js"
import { catchError } from "./catchError.js"





// middleware for check job HR
const checkForJobHR=catchError(
    async(req,res,next)=>{
    let job=await userModel.findOne({_id:req.body.addedBy})
    if(job){
        if(job.role !=='Company_HR') return next(new AppError("you are not allow to add job"))
    }else{next(new AppError("user not found",404))}
    next()
    }
    )
    
//middleware companyOwner 
const checkForCompanyOwner=catchError(
async(req,res,next)=>{
let job=await jobModel.findById(req.params.id)
if(job){if(job.addedBy==req.body.companyHRId){
    next()
    }else{
    next(new AppError("you are not owner",401))
    }}else{next(new AppError("App not found",404))}

}
)
export{
    checkForJobHR,
    checkForCompanyOwner
}


