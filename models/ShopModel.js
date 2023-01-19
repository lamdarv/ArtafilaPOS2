import mongoose from "mongoose";

//for create table into db
const Shop = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  bussiness_type: {
    type: String,
    required: true,
  },
  shop_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Shop", Shop);
