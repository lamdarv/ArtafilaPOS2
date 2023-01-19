import mongoose from "mongoose";

//for create table into db
const Transaction = new mongoose.Schema(
  {
    cartItems: {
      type: Array,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    //for date
    timestamps: true,
  }
);

export default mongoose.model("Transaction", Transaction);
