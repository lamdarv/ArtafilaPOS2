import mongoose from "mongoose";

//for create table into db
const Review = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Review", Review);
