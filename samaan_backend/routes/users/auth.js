const express = require("express");
const { userRegistration,userLogin } = require("../../controllers/userController");
const router = express.Router();
router.post("/registration", userRegistration).post("/login", userLogin);

module.exports = router;
