const Sequelize = require("sequelize");
const db = require("../config/db");

module.exports = Role = db.define("role", {
  role: Sequelize.STRING,
});

// db.sync({ alter: true }).then(() => {
//   console.log(`Roles table created`);
// });
