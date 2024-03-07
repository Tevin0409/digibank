module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("accounts", {
    accountNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return Account;
};
