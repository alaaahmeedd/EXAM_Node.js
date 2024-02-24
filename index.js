import express from 'express';
import { dbConnection } from './dbConnection/dbConnection.js';
import { globalHandleError } from './src/middleware/globalHandlerError.js';
import { AppError } from './src/utils/AppError.js';
import userRouter from './src/modules/user/user.routes.js';
import dotenv from 'dotenv'
import companyRouter from './src/modules/company/company.routes.js';
import jobRouter from './src/modules/job/job.routes.js';
dotenv.config()
const app=express()
const port=3000
app.use(express.json())
app.use(userRouter)
app.use(companyRouter)
app.use(jobRouter)

dbConnection()





// routes ErrorHandler function
app.use('*',(req,res,next)=>{
next(new AppError(`not found url ${req.originalUrl}`,404))
})
app.use(globalHandleError)

app.listen(port,()=>{
console.log(`server is running on port ${port}`);
})