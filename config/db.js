const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

// Creating new Object of Sequelize
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",

    host: process.env.DB_HOST,
  }
);

module.exports = db;
