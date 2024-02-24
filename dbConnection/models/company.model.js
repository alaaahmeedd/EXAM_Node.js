import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      unique: true,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    numberOfEmployees: {
      type: Number,
      min: 11,
      max: 20,
    },
    companyHRId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    address: String,
  },
  { timestamps: true }
);

export const companyModel = mongoose.model("company", companySchema);
