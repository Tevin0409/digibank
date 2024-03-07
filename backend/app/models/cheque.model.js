// models/cheque.model.js
module.exports = (sequelize, Sequelize) => {
  const Cheque = sequelize.define("cheques", {
    chequeNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    accountNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    payeeName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("issued", "cleared", "cancelled"),
      defaultValue: "issued",
    },
    issueDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    clearanceDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    // Add more attributes as needed
  });

  return Cheque;
};
