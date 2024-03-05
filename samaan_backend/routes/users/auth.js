const express = require("express");
const {
  userRegistration,
  userLogin,
  authorization,
} = require("../../controllers/userController");
const { validators } = require("../../middleware/validation");
const router = express.Router();
router
  .post("/registration", validators, userRegistration)
  .post("/login", userLogin)
  .post("/authorization", authorization);

module.exports = router;
