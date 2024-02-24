import Joi from "joi";

const addJobVal = Joi.object({
  jobTitle: Joi.string().min(5).max(100).required(),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid").required(),
  workingTime: Joi.string().valid("part-time", "full-time").required(),
  seniorityLevel: Joi.string()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO")
    .required(),
  jobDescription: Joi.string().min(5).max(500).required(),
  addedBy: Joi.string().hex().length(24).required(),
  technicalSkills: Joi.string().min(10).max(300).required(),
  softSkills: Joi.string().min(10).max(300).required(),
});

const updateJobVal = Joi.object({
  id: Joi.string().hex().length(24),
  jobTitle: Joi.string().min(5).max(100),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid"),
  workingTime: Joi.string().valid("part-time", "full-time"),
  seniorityLevel: Joi.string().valid(
    "Junior",
    "Mid-Level",
    "Senior",
    "Team-Lead",
    "CTO"
  ),
  jobDescription: Joi.string().min(5).max(500),
  addedBy: Joi.string().hex().length(24),
  technicalSkills: Joi.string().min(10).max(300),
  softSkills: Joi.string().min(10).max(300),
});

const deleteJobVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  addedBy: Joi.string().hex().length(24).required(),
});

const getAllJobCompanyVal = Joi.object({
  companyName: Joi.string().min(3).max(20).required(),
});

const jobFilterVal = Joi.object({
  jobTitle: Joi.string().min(5).max(100),
  jobLocation: Joi.string().valid("onsite", "remotely", "hybrid"),
  workingTime: Joi.string().valid("part-time", "full-time"),
  seniorityLevel: Joi.string().valid(
    "Junior",
    "Mid-Level",
    "Senior",
    "Team-Lead",
    "CTO"
  ),
  jobDescription: Joi.string().min(5).max(500),
  addedBy: Joi.string().hex().length(24),
  technicalSkills: Joi.string().min(10).max(300),
  softSkills: Joi.string().min(10).max(300),
});

const applyJobVal = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
  userId: Joi.string().hex().length(24).required(),
  userTechSkills: Joi.string().min(10).max(300).required(),
  userSoftSkills: Joi.string().min(10).max(300).required(),
});

export {
  addJobVal,
  updateJobVal,
  deleteJobVal,
  getAllJobCompanyVal,
  jobFilterVal,
  applyJobVal,
};
