import express from "express";
import { getReview, saveReview } from "../controllers/ReviewController.js";

const router = express.Router();

router.get("/review/view", getReview);
router.post("/review", saveReview);

export default router;
