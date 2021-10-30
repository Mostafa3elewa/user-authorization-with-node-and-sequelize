const User = require("../models/userModel");

const getAll = async (req, res) => {
  const employees = await User.findAll({
    include: ["roles"],
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });
  res.send(employees);
};

module.exports = getAll;
