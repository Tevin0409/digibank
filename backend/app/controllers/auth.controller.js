const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Account = db.account;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Save User to Database
    const user = await User.create({
      accountNumber: req.body.accountNumber,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      pin: bcrypt.hashSync(req.body.pin, 8),
    });

    // Create Account for the user
    const account = await Account.create({
      accountNumber: req.body.accountNumber,
      balance: 0, // Initial balance can be set here
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
    } else {
      // Set default role for the user
      const defaultRole = await Role.findOne({ where: { name: "user" } });
      await user.setRoles([defaultRole]);
    }

    res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      accountNumber: req.body.accountNumber,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var pinIsValid = bcrypt.compareSync(req.body.pin, user.pin);

      if (!pinIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid PIN!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          accountNumber: user.accountNumber,
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.changePin = async (req, res) => {
  const { user } = req;
  const { oldPin, newPin } = req.body;

  try {
    // Find the user by ID
    const foundUser = await User.findByPk(user.id);

    // Check if the old pin is correct
    const isOldPinValid = bcrypt.compareSync(oldPin, foundUser.pin);
    if (!isOldPinValid) {
      return res.status(401).json({ error: "Invalid old PIN" });
    }

    // Update the pin with the new one
    foundUser.pin = bcrypt.hashSync(newPin, 8);
    await foundUser.save();

    res.status(200).json({ message: "PIN changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
