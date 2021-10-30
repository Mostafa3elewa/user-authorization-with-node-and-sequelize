const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//check if the user is logged in

const protect = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      console.log(token);

      //verify the token
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET
      );

      //   add user deatils to the request
      req.user = await User.findOne({
        where: { id: decoded.id },
      });
      const role = await Role.findOne({
        where: { userId: decoded.id },
      });
      await console.log(role.dataValues.role);
      next();
    } catch (error) {
      res.redirect("/");
      console.log(error.message);
    }
  } else {
    res.status(401).send("Token invalid").redirect("/");
    console.log("No token");
  }
};

////////////////////////***************************************************/////////////////////////////////////

//check if the user logged in is admin or higher
const admin = async (req, res, next) => {
  try {
    const role = await Role.findOne({
      where: { userId: req.user.dataValues.id },
    });
    if (
      role.dataValues.role === "admin" ||
      role.dataValues.role === "owner"
    ) {
      next();
    } else {
      res.status(401).send("not authorized");
    }
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

////////////////////////***************************************************/////////////////////////////////////

//check if the user logged in is moderator or higher

const moderator = async (req, res, next) => {
  try {
    const role = await Role.findOne({
      where: { userId: req.user.dataValues.id },
    });
    if (
      role.dataValues.role === "moderator" ||
      role.dataValues.role === "admin" ||
      role.dataValues.role === "owner"
    ) {
      next();
    } else {
      res.status(401).send("not authorized");
    }
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

exports.protect = protect;

exports.admin = admin;

exports.moderator = moderator;
