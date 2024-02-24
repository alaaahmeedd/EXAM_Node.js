import express from "express";

import {
  registerUser,
  loginUser,
  updateUserDetails,
  deleteUserAccount,
  getUserData,
  getOtherUserData,
  updatePassword,
  sendOTP,
  resetPasswordWithOTP,
  getUsersByRecoveryEmail,
} from "./user.controller.js";

import { validation } from "../../middleware/validation.js";

import {
  forgetPasswordVal,
  signupVal,
  updatePasswordVal,
  updateUserVal,
} from "./user.validation.js";

import { auth } from "../../middleware/auth.js";

import {
  checkEmail,
  checkMobileNumber,
  checkOwner,
  findRecoveryEmail,
  findUser,
} from "../../middleware/checkUser.js";

const myRouter = express.Router();

myRouter.post(
  "/signup",
  validation(signupVal),
  checkEmail,
  checkMobileNumber,
  registerUser
);

myRouter.post("/signin", loginUser);

myRouter.put(
  "/updateUser/:id",
  validation(updateUserVal),
  auth,
  checkEmail,
  checkMobileNumber,
  findUser,
  checkOwner,
  updateUserDetails
);

myRouter.delete(
  "/deleteUser/:id",
  auth,
  findUser,
  checkOwner,
  deleteUserAccount
);
myRouter.get("/userData/:id", auth, findUser, checkOwner, getUserData);
myRouter.get("/otherUserData/:id", findUser, getOtherUserData);

myRouter.put(
  "/updatePassword/:id",
  auth,
  validation(updatePasswordVal),
  findUser,
  checkOwner,
  updatePassword
);

myRouter.post("/otpCode", sendOTP);

myRouter.put(
  "/forgetPassword/:id",
  validation(forgetPasswordVal),
  findUser,
  resetPasswordWithOTP
);

myRouter.get("/recoveryEmailUsers", findRecoveryEmail, getUsersByRecoveryEmail);

export default myRouter;
