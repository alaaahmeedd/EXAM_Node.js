import jwt from "jsonwebtoken";
import { userModel } from "../../../dbConnection/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import { genOTP } from "../../middleware/otp.js";
import { otpModel } from "../../../dbConnection/models/otp.model.js";

const registerUser = catchError(async (req, res, next) => {
  const { firstName, lastName } = req.body;
  let newUserName = firstName + lastName;
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  await userModel.insertMany({ ...req.body, userName: newUserName });
  res.json({ message: "Registration successful" });
});

const loginUser = catchError(async (req, res, next) => {
  let user = await userModel.findOne({
    $or: [{ email: req.body.email }, { mobileNumber: req.body.mobileNumber }],
  });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ userID: user._id }, process.env.JWT_KEY);
    await userModel.findOneAndUpdate(user, { status: "online" });
    res.json({ message: "Login successful", token });
  } else {
    next(new AppError("Incorrect email or password", 401));
  }
});

const updateUserDetails = catchError(async (req, res, next) => {
  const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } =
    req.body;
  let newUserName = firstName + lastName;
  let user = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      email,
      mobileNumber,
      recoveryEmail,
      DOB,
      lastName,
      firstName,
      userName: newUserName,
    },
    { new: true }
  );
  res.json({ message: "User details updated", user });
});

const deleteUserAccount = catchError(async (req, res, next) => {
  await userModel.findByIdAndDelete(req.params.id);
  res.json({ message: "User account deleted" });
});

const getUserData = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  res.json({ message: "User data retrieved", user });
});

const getOtherUserData = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  res.json({ message: "Other user data retrieved", user });
});

const updatePassword = catchError(async (req, res, next) => {
  let user = await userModel.findByIdAndUpdate(req.params.id, {
    password: bcrypt.hashSync(req.body.newPassword, 10),
  });
  res.json({ message: "Password updated", user });
});

const sendOTP = catchError(async (req, res, next) => {
  const otpCode = genOTP();
  await otpModel.insertMany({ otpCode });
  res.json({ message: "OTP sent successfully", otpCode });
});

const resetPasswordWithOTP = catchError(async (req, res, next) => {
  const { otpCode } = req.body;
  let userOtpCode = await otpModel.findOne({ otpCode });
  if (userOtpCode) {
    if (userOtpCode.otpCode == req.body.otpCode) {
      let user = await userModel.findByIdAndUpdate(req.params.id, {
        password: bcrypt.hashSync(req.body.newPassword, 10),
      });
      res.json({ message: "Password reset successful", user });
    }
  } else {
    next(new AppError("Invalid OTP"));
  }
});

const getUsersByRecoveryEmail = catchError(async (req, res, next) => {
  let users = await userModel.find({ recoveryEmail: req.body.recoveryEmail });
  res.json({ message: "Users retrieved by recovery email", users });
});

export {
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
};

