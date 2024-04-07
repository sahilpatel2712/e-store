const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const UserModel = require("../../models/userModel");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      let users = await UserModel.findAll();
      users = users.map((user) => user.toJSON());
      res.render("layout/app", {
        title: "Users",
        filename: "../user/index",
        items: users,
        admin:req.admins.admin,
        route: "users",
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  userForm: async (req, res, next) => {
    const { userId } = req.params;
    if (userId === "0") {
      res.render("layout/app", {
        title: "Add form",
        filename: "../user/form",
        admin:req.admins.admin,
        data: null,
        route: "users",
      });
    } else {
      const user = await UserModel.findByPk(userId);
      res.render("layout/app", {
        title: "Edit form",
        filename: "../user/form",
        data: user.toJSON(),
        admin:req.admins.admin,
        route: "users",
      });
    }
  },
  addUserOrUpdateUser: async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    } else {
      try {
        const { userId } = req.params;
        const { name, email, address, password } = req.body;

        let user;

        if (userId === "0") {
          const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT)
          );
          user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            address,
          });
          res.redirect("/admin/users");
        } else {
          user = await UserModel.findByPk(userId);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT)
          );
          user.name = name;
          user.email = email;
          user.address = address;
          user.password = hashedPassword;
          await user.save();

          res.redirect("/admin/users");
        }
      } catch (error) {
        console.error("Error adding or updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await UserModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();
      res.redirect("/admin/users");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
