import Transaction from "../models/TransactionModel.js";

export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveTransaction = async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    const insertedtransaction = await transaction.save();
    res.status(201).json(insertedtransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
