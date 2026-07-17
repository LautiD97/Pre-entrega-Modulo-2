import mongoose from "mongoose";
import { ORDER_STATUS, PRIORITIES } from "../constants/index.js";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    priority: {
      type: String,
      enum: Object.values(PRIORITIES),
      default: PRIORITIES.MEDIUM,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);