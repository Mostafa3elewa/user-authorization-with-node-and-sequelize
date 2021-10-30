const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const Role = require("./rolesModel");

module.exports = User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isEmail: {
          type: true,
          msg: "please enter a vaild mail",
        },
      },
    },
    password: { type: Sequelize.TEXT, allowNull: false },

    age: { type: Sequelize.INTEGER, allowNull: false },

    country: Sequelize.TEXT,
    position: Sequelize.TEXT,
    wage: Sequelize.STRING(100),
  },
  {
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);
User.hasMany(Role, { as: "roles", onDelete: "cascade" });
Role.belongsTo(User, {
  as: "user",
  foreignKey: {
    type: Sequelize.INTEGER,
  },
});

/////////////////****************uncomment this section to create tables **********************//////////////////

// db.sync({ alter: true });
// console.log(
//   "The table for the User model was just (re)created!"
// );
