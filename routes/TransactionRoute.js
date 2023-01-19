import express from "express";
import {
  getTransaction,
  getTransactionById,
  saveTransaction,
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/view", getTransaction);
router.get("/view/:id", getTransactionById);
router.post("/add", saveTransaction);

export default router;
