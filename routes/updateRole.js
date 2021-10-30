const updateRole = async (req, res) => {
  const id = req.body.id;
  const role = req.body.role;

  //check if the targeted user is the owner

  oldRole = await Role.findOne({ where: { userId: id } });
  if (oldRole.role === "owner") {
    res.status(401).send("can't update role of that user");
  } else {
    try {
      await Role.update(
        { role },
        {
          where: {
            userId: id,
          },
        }
      );
      res.send(role);
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = updateRole;
