import { AppError } from "../utils/AppError.js";


// function for validation inputs

export const validation=(schema)=>{
return (req,res,next)=>{
const {error} =schema.validate({...req.body,...req.params,...req.query},{abortEarly:false});
if(!error){
next()
}else{
let errMsg=[];
error.details.forEach((val)=>{
errMsg.push(val.message)
});
next (new AppError(errMsg,401))
}
}
}