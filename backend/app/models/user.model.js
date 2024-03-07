module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    accountNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },

    pin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};
