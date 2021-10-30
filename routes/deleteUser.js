module.exports = deleteUser = async (req, res) => {
  const id = req.params.id;

  // check if the targer account is the owner

  oldRole = await Role.findOne({ where: { userId: id } });
  if (oldRole.role === "owner") {
    res.status(401).send("can't delete this user");
  } else {
    try {
      await User.destroy({
        where: {
          id,
        },
      });
      res.send("user deleted");
    } catch (error) {
      console.log(error);
    }
  }
};
