import Member from "../models/MemberModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export const getMember = async (req, res) => {
  try {
    const member = await Member.find();
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.json(member);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveMember = expressAsyncHandler(async (req, res) => {
  const newMember = new Member({
    member_name: req.body.member_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
  });
  const member = await newMember.save();
  res.json({
    message: "Register Success",
    member,
  });
});

export const updateMember = async (req, res) => {
  try {
    const updatedmember = await Member.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedmember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const deletedmember = await Member.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedmember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
