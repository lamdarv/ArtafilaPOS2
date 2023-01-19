import express from "express";
import {
  getShop,
  saveShop,
  updateShop,
} from "../controllers/ShopController.js";

const router = express.Router();

router.get("/view", getShop);
router.post("/shop/add", saveShop);
router.patch("/shop/edit/:id", updateShop);

export default router;
