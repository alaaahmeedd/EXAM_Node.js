import Joi from "joi";

const signupVal = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[A-Z][a-z0-9]{8,40}$/),
  recoveryEmail: Joi.string().email().required(),
  DOB: Joi.string()
    .pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{1,2}$/)
    .required(),
  mobileNumber: Joi.string().pattern(/^01[1250][0-9]{8}$/),
});

const updateUserVal = Joi.object({
  id: Joi.string().hex().length(24),
  firstName: Joi.string().min(3).max(20),
  lastName: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  recoveryEmail: Joi.string().email(),
  DOB: Joi.string().pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{1,2}$/),
  mobileNumber: Joi.string().pattern(/^01[1250][0-9]{8}$/),
});

const updatePasswordVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  newPassword: Joi.string().pattern(/^[A-Z][a-z0-9]{8,40}$/),
});

const forgetPasswordVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  newPassword: Joi.string().pattern(/^[A-Z][a-z0-9]{8,40}$/),
  otpCode: Joi.string().length(5),
});

const recoveryEmailVal = Joi.object({
  email: Joi.string().email().required(),
});

export {
  signupVal,
  updateUserVal,
  updatePasswordVal,
  forgetPasswordVal,
  recoveryEmailVal,
};
