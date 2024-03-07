const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateAccountNumberOrEmail = (req, res, next) => {
  // accountNumber
  User.findOne({
    where: {
      accountNumber: req.body.accountNumber,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Account Number is already in use!",
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

checkPin = (req, res, next) => {
  const pin = req.body.pin;

  // Check if pin is not provided or is not a number
  if (!pin || isNaN(pin)) {
    return res.status(400).send("PIN is required and must be a number.");
  }

  // Check if pin has minimum required digits
  const minDigits = 4; // Example: Minimum 4 digits
  if (pin.toString().length < minDigits) {
    return res.status(400).send(`PIN must have at least ${minDigits} digits.`);
  }

  // If pin passes validation, proceed to the next middleware or route handler
  next();
};

const verifySignUp = {
  checkDuplicateAccountNumberOrEmail: checkDuplicateAccountNumberOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkPin: checkPin,
};

module.exports = verifySignUp;
