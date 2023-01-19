import Shop from "../models/ShopModel.js";

export const getShop = async (req, res) => {
  try {
    const shop = await Shop.find();
    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveShop = async (req, res) => {
  const shop = new Shop(req.body);
  try {
    const insertedshop = await shop.save();
    res.status(201).json(insertedshop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateShop = async (req, res) => {
  try {
    const updatedshop = await Shop.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedshop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
