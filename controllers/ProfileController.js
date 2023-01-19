import Profile from "../models/ProfileModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/utils.js";
// import { generateToken } from "../utils.js";

//for login
export const loginController = async (req, res) => {
  const profile = await Profile.findOne({email: req.body.email});
    if(profile) {
        if(bcrypt.compareSync(req.body.password, profile.password)) {
            res.send({
                _id: profile._id,
                name: profile.name,
                email: profile.email,
                
                token: generateToken(profile)
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid Email or Password'});
  }


//for register
export const registerController = async (req, res) => {
  const newUser = new Profile({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  const profile = await newUser.save();
  res.send({
    _id: profile._id,
    name: profile.name,
    email: profile.email,
    password: profile.password,
    token: generateToken(profile),
  });
};

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.find();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    res.json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveProfile = async (req, res) => {
  const profile = new Profile(req.body);
  try {
    const insertedprofile = await profile.save();
    res.status(201).json(insertedprofile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedprofile = await Profile.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedprofile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const deletedprofile = await Profile.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedprofile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
