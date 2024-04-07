const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findOne({ where: { userId: decoded.userId } });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = user.toJSON();
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { authenticateUser };
