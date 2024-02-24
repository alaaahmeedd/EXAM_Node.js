import Joi from "joi";

const addCompanyVal = Joi.object({
  companyName: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(5).max(200).required(),
  companyEmail: Joi.string().email().required(),
  industry: Joi.string().min(5).max(100).required(),
  numberOfEmployees: Joi.number().min(11).max(20),
  companyHRId: Joi.string().hex().length(24).required(),
  address: Joi.string().min(10).max(200).required(),
});

const updateCompanyVal = Joi.object({
  id: Joi.string().hex().length(24),
  companyName: Joi.string().min(3).max(20),
  description: Joi.string().min(5).max(200),
  companyEmail: Joi.string().email(),
  industry: Joi.string().min(5).max(100),
  numberOfEmployess: Joi.number().min(11).max(20),
  companyHRId: Joi.string().hex().length(24),
  address: Joi.string().min(10).max(200),
});

const deleteCompanyVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  companyHRId: Joi.string().hex().length(24).required(),
});

export { addCompanyVal, updateCompanyVal, deleteCompanyVal };
