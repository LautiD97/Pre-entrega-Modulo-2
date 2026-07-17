import mongoose from "mongoose";
import { ROLES } from "../constants/index.js";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.DRIVER,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Driver", driverSchema);