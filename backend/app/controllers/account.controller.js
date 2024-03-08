// controllers/accountController.js
const db = require("../models");
const Account = db.account;
const Cheque = db.cheque;

const deposit = async (req, res) => {
  const { amount } = req.body;
  const { user } = req;
  try {
    const account = await Account.findOne({
      where: { accountNumber: user.accountNumber },
    });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    account.balance += amount;
    await account.save();
    res.status(200).json({ message: "Deposit successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBalance = async (req, res) => {
  const { user } = req;
  try {
    const account = await Account.findOne({
      where: { accountNumber: user.accountNumber },
    });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const issueCheque = async (req, res) => {
  const { payeeName, amount, chequeNumber, issueDate, clearanceDate } =
    req.body;
  const { user } = req;
  try {
    const account = await Account.findOne({
      where: { accountNumber: user.accountNumber },
    });
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    const cheque = await Cheque.create({
      accountNumber: user.accountNumber,
      payeeName,
      amount,
      chequeNumber,
      issueDate,
      clearanceDate,
    });
    account.balance -= amount;
    await account.save();
    res.status(200).json({ message: "Cheque issued successfully", cheque });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllCheques = async (req, res) => {
  const { user } = req;
  try {
    const cheques = await Cheque.findAll({
      where: { accountNumber: user.accountNumber },
    });
    res.status(200).json(cheques);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const cancelCheque = async (req, res) => {
  const { chequeNumber } = req.body;
  try {
    const cheque = await Cheque.findOne({
      where: { chequeNumber },
    });
    if (!cheque) {
      return res.status(404).json({ error: "Cheque not found" });
    }
    if (cheque.status === "cleared") {
      return res.status(400).json({ error: "Cannot cancel a cleared cheque" });
    }
    await cheque.update({ status: "cancelled" });
    res.status(200).json({ message: "Cheque cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  deposit,
  getBalance,
  issueCheque,
  cancelCheque,
  getAllCheques,
};
