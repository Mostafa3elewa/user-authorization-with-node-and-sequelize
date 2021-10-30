const express = require("express");
const app = express();
const cors = require("cors");
const getAll = require("./routes/getAll");
const addUser = require("./routes/addUser");
const updateRole = require("./routes/updateRole");
const deleteUser = require("./routes/deleteUser");
const User = require("./config/db");
const Role = require("./models/rolesModel");
const userLogin = require("./routes/login");
const dotenv = require("dotenv");
const db = require("./config/db");
const {
  protect,
  admin,
  moderator,
} = require("./middleware/auth");
dotenv.config();

app.use(cors());
app.use(express.json());

// users API

app.post("/create", addUser);

app.get("/users", protect, moderator, getAll);

app.delete("/delete/:id", protect, admin, deleteUser);

app.post("/login", userLogin);

//update role of user
app.put("/update", protect, admin, updateRole);

db.authenticate()
  .then(() => {
    console.log(
      "Connection has been established successfully."
    );
  })
  .catch((err) => {
    console.error(
      "Unable to connect to the database:",
      err
    );
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`your server is running on port ${port} `);
});
