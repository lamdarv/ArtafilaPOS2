import express from "express";
import {
  getProfile,
  getProfileById,
  saveProfile,
  updateProfile,
  deleteProfile,
  loginController,
  registerController,
} from "../controllers/ProfileController.js";
import { isAuth } from "../middlewares/utils.js";

const router = express.Router();

router.get("/view", getProfile);
router.get("/profile/:id", getProfileById);
// router.post("/profile", saveProfile);
router.patch("/profile/edit/:id", updateProfile);
router.delete("/profile/:id", deleteProfile);
router.post("/login", loginController);
router.post("/register", registerController);

router.get('/view', isAuth, async (req, res) =>  {

  try {
    const profile = await Profile.find();
    if(!profile){
      return res.json({message:'No user found'})
    }
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
