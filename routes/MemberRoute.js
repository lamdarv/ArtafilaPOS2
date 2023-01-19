import express from "express";
import {
  getMember,
  getMemberById,
  saveMember,
  updateMember,
  deleteMember,
} from "../controllers/MemberController.js";

const router = express.Router();

router.get("/view", getMember);
router.get("/view/:id", getMemberById);
router.post("/add", saveMember);
router.patch("/edit/:id", updateMember);
router.delete("/delete/:id", deleteMember);

export default router;
