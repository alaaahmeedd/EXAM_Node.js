import { appModel } from "../../../dbConnection/models/app.model.js";
import { companyModel } from "../../../dbConnection/models/company.model.js";
import { jobModel } from "../../../dbConnection/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";

const addCompany = catchError(async (req, res, next) => {
  await companyModel.insertMany(req.body);
  res.json({ message: "Company added successfully" });
});

const updateCompany = catchError(async (req, res, next) => {
  const {
    companyName,
    description,
    companyEmail,
    industry,
    numberOfEmployees,
    address,
    companyHRId,
  } = req.body;

  let company = await companyModel.findByIdAndUpdate(
    req.params.id,
    {
      companyName,
      description,
      companyEmail,
      industry,
      numberOfEmployees,
      address,
      companyHRId,
    },

    { new: true }
  );
  res.json({ message: "Company updated successfully", company });
});

const deleteCompany = catchError(async (req, res, next) => {
  await companyModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Company deleted successfully" });
});

const getCompanyData = catchError(async (req, res, next) => {
  let jobs = await jobModel.find({ addedBy: req.body.companyHRId });
  let company = await companyModel.findById(req.params.id);
  if (company) {
    if (jobs)
      return res.json({
        message: "Data retrieved successfully",
        company,
        jobs,
      });
    res.json({ message: "There are no jobs for this company", company });
  }
  next(new AppError("Company not found", 404));
});

const searchCompanyName = catchError(async (req, res, next) => {
  let company = await companyModel.findOne({
    companyName: req.body.companyName,
  });
  if (company) return res.json({ message: "Company found", company });
  next(new AppError("Company not found", 404));
});

const getAppData = catchError(async (req, res, next) => {
  let app = await appModel
    .find({ jobId: req.params.id })
    .populate("userId", "-_id");
  if (app) return res.json({ message: "Data retrieved successfully", app });
  next(new AppError("App not found", 404));
});

export {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanyData,
  searchCompanyName,
  getAppData,
};
