const User = require("../models/userModel");

const getAll = async (req, res) => {
  const employees = await User.findAll({
    include: [Role],
  });
  res.send(employees);
};

module.exports = getAll;
