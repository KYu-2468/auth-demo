const Sequelize = require("sequelize");
require("dotenv").config();
// manual import of pg for vercel deployment workaround
require("pg");

const config = {
  logging: false,
};

const db = new Sequelize(
  process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test"
    ? process.env.DATABASE_URL_LOCAL
    : process.env.DATABASE_URL,
  config
);

module.exports = db;
