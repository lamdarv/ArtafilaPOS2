import Review from "../models/ReviewModel.js";

export const getReview = async (req, res) => {
  try {
    const review = await Review.find();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveReview = async (req, res) => {
  const review = new Review(req.body);
  try {
    const insertedreview = await review.save();
    res.status(201).json(insertedreview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
