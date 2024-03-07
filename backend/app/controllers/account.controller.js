// controllers/accountController.js
const db = require("../models");
const Account = db.account;

const deposit = async (req, res) => {
  const { amount } = req.body;
  const { user } = req;
  try {
    const account = await Account.findOne({
      where: { accountNumber: user.accountNumber },
    });
    console.log(user.accountNumber);
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

module.exports = { deposit, getBalance };
