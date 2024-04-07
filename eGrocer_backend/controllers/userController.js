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
          responseMessage: "User Register Successfully",
          authToken: token,
          userData: newUser,
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
        return res.status(401).json({ error: "Invalid email " });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid  password" });
      }

      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        responseMessage: "User Login Successfully",
        authToken: token,
        userData: user,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateUserAddress: async (req, res, next) => {
    try {
      const { address, userId } = req.body;

      const user = await UserModel.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.address = address;
      await user.save();

      res
        .status(200)
        .json({ responseMessage: "User address updated successfully", user });
    } catch (error) {
      console.error("Error updating user address:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  authorization: async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await UserModel.findOne({
        where: { userId: decoded.userId },
      });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      res.status(200).json({
        responseMessage: "User Login Successfully",
        authToken: token,
        userData: user.toJSON(),
      });
    } catch (error) {
      console.error("Error authenticating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
