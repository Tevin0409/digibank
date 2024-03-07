const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.account = require("./account.model.js")(sequelize, Sequelize);
db.cheque = require("./cheque.model.js")(sequelize, Sequelize);
// Define relationship between User and Account models
db.user.hasOne(db.account, {
  foreignKey: "accountNumber",
  sourceKey: "accountNumber",
});
db.account.belongsTo(db.user, {
  foreignKey: "accountNumber",
  targetKey: "accountNumber",
});

db.account.hasMany(db.cheque, {
  foreignKey: "accountNumber",
  sourceKey: "accountNumber",
});
db.cheque.belongsTo(db.account, {
  foreignKey: "accountNumber",
  targetKey: "accountNumber",
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
