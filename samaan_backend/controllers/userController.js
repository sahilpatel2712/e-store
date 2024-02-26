const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports = {
  userRegistration: async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    } else {
      try {
        const { name, email, password, address } = req.body;

        const hashedPassword = await bcrypt.hash(
          password,
          Number(process.env.SALT)
        );

        const newUser = await UserModel.create({
          name,
          email,
          password: hashedPassword,
          address,
        });

        const token = jwt.sign(
          { userId: newUser.userId, email: newUser.email },
          process.env.JWT_SECRET
        );

        res.status(201).json({
          message: "User Register Successfully",
          authToken: token,
          data: { userName: newUser.name, email: newUser.email },
        });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  userLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        process.env.JWT_SECRET
      );

      res.status(200).json({ user, token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
