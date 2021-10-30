const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const userLogin = async (req, res) => {
  let user = await User.findOne({
    where: { email: req.body.email },
  });
  if (
    user &&
    (await bcrypt.compare(req.body.password, user.password))
  ) {
    res.send({ token: generateToken(user.id) });
  } else {
    res.status(400).send("invalid mail or pass");
  }
};

module.exports = userLogin;
