import express from "express";
import { validation } from "../../middleware/validation.js";
import { addJob, applyJob, deleteJob, filterJobs, getAllJobsCompany, updateJob } from "./job.controller.js";
import { checkForJobHR } from "../../middleware/checkForJob.js";
import { addJobVal, applyJobVal, deleteJobVal, getAllJobCompanyVal, jobFilterVal, updateJobVal } from "./job.validation.js";

let jobRoutes = express.Router();

jobRoutes.post("/jobs/add", validation(addJobVal), checkForJobHR, addJob);
jobRoutes.put("/jobs/update/:id", validation(updateJobVal), checkForJobHR, updateJob);
jobRoutes.delete("/jobs/delete/:id", validation(deleteJobVal), checkForJobHR, deleteJob);
jobRoutes.get("/jobs/getAllCompany", validation(getAllJobCompanyVal), getAllJobsCompany);
jobRoutes.get("/jobs/filter", validation(jobFilterVal), filterJobs);
jobRoutes.post("/jobs/apply", validation(applyJobVal), applyJob);

export default jobRoutes;
