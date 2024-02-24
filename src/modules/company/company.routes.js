import express from "express";

let companyRouter = express.Router();

import {
  addCompany,
  deleteCompany,
  getAppData,
  getCompanyData,
  searchCompanyName,
  updateCompany,
} from "./company.controller.js";

import {
  checkCompanyEmail,
  checkCompanyName,
  checkForHR,
  findCompany,
} from "../../middleware/checkCompany.js";

import { validation } from "../../middleware/validation.js";

import {
  addCompanyVal,
  deleteCompanyVal,
  updateCompanyVal,
} from "./company.validation.js";

import { checkForCompanyOwner } from "../../middleware/checkForJob.js";

companyRouter.post(
  "/add-company",
  validation(addCompanyVal),
  checkCompanyName,
  checkCompanyEmail,
  checkForHR,
  addCompany
);

companyRouter.put(
  "/updateCompany/:id",
  validation(updateCompanyVal),
  findCompany,
  checkCompanyName,
  checkCompanyEmail,
  checkForHR,
  updateCompany
);

companyRouter.delete(
  "/deleteCompany/:id",
  validation(deleteCompanyVal),
  findCompany,
  checkCompanyName,
  checkCompanyEmail,
  checkForHR,
  deleteCompany
);

companyRouter.get("/getCompanyData/:id", checkForHR, getCompanyData);

companyRouter.get("/searchCompanyName", searchCompanyName);

companyRouter.get(
  "/getAppData/:id",
  checkForHR,
  checkForCompanyOwner,
  getAppData
);

export default companyRouter;
