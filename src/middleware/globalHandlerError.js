

// global errorHandler
export const globalHandleError=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
res.status(err.statusCode).json({error:err.message})
}