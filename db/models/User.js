const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: Sequelize.STRING,
  },
  provider: {
    type: Sequelize.ENUM("local", "google"),
    allowNull: false,
    defaultValue: "local",
  },
  type: {
    type: Sequelize.ENUM("Root", "User", "Admin", "View Only"),
    defaultValue: "User",
  },
  accessToken: {
    type: Sequelize.STRING,
  },
  refreshToken: {
    type: Sequelize.STRING,
  },
  socialId: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.verifyPassword = function (password) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(password, this.password);
};

const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

/**
 * hooks
 */

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
