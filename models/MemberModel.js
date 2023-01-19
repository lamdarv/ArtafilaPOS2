import mongoose from "mongoose";

const Member = mongoose.Schema({
  member_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true
  },
});

export default mongoose.model("Member", Member);
