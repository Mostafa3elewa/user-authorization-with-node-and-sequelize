const bcrypt = require("bcrypt");
const rolesModel = require("../models/rolesModel");
const generateToken = require("../utils/generateToken");

const addUser = async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  const password = req.body.password;
  const email = req.body.email;
  let user = await User.findOne({
    where: { email },
  });
  if (!user) {
    try {
      user = await User.create({
        name,
        email,
        age,
        country,
        position,
        wage,
        password: bcrypt.hashSync(password, 10),
      });
      await Role.create({
        userId: user.id,
        role: "user",
      });
      res.send(generateToken(user.id));
    } catch (error) {
      res.send(error);
    }
  } else {
    res.status(400).send("email already in use");
  }
};

module.exports = addUser;
