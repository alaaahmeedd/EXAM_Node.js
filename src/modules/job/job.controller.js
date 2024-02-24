import { appModel } from "../../../dbConnection/models/app.model.js";
import { companyModel } from "../../../dbConnection/models/company.model.js";
import { jobModel } from "../../../dbConnection/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";

const addJob = catchError(async (req, res, next) => {
  await jobModel.insertMany(req.body);
  res.json({ message: "Job added successfully" });
});

const updateJob = catchError(async (req, res, next) => {
  const {
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    addedBy,
    softSkills
  } = req.body;
  let job = await jobModel.findByIdAndUpdate(
    req.params.id,
    {
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      addedBy,
      softSkills
    },
    { new: true }
  );
  if (job) return res.json({ message: "Job updated successfully", job });
  next(new AppError("Job not found", 404));
});

const deleteJob = catchError(async (req, res, next) => {
  let job = await jobModel.findByIdAndDelete(req.params.id);
  if (job) return res.json({ message: "Job deleted successfully", job });
  next(new AppError("Job not found", 404));
});

const getAllJobsCompany = catchError(async (req, res, next) => {
  let company = await companyModel.findOne({ companyName: req.query.companyName });
  if (company) {
    let jobs = await jobModel.find({ addedBy: company.companyHRId });
    if (jobs) return res.json({ message: "All jobs for the company retrieved successfully", jobs });
  }
  next(new AppError("No jobs found for the company", 404));
});

const filterJobs = catchError(async (req, res, next) => {
  const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;

  const filterQuery = {};
  if (workingTime) filterQuery.workingTime = workingTime;
  if (jobLocation) filterQuery.jobLocation = jobLocation;
  if (seniorityLevel) filterQuery.seniorityLevel = seniorityLevel;
  if (jobTitle) filterQuery.jobTitle = jobTitle;
  if (technicalSkills) filterQuery.technicalSkills = technicalSkills;

  let jobs = await jobModel.find(filterQuery);

  if (jobs.length > 0) {
    return res.json({ message: "Filtered jobs retrieved successfully", jobs });
  } else {
    return next(new AppError("No jobs found matching the filter criteria", 404));
  }
});


const applyJob = catchError(async (req, res, next) => {
  let job = await jobModel.findById(req.body.jobId);
  if (job) {
    await appModel.insertMany(req.body);
    res.json({ message: "Job application submitted successfully" });
  } else {
    next(new AppError("Job not found", 404));
  }
});

export {
  addJob,
  updateJob,
  deleteJob,
  getAllJobsCompany,
  filterJobs,
  applyJob
};
