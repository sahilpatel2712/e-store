const express = require("express");
const {
  getUsers,
  userForm,
  addUserOrUpdateUser,
  deleteUser,
} = require("../../controllers/admin/userController");
const { validators } = require("../../middleware/validation");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/form/:userId", userForm);
router.post("/users/save/:userId", validators, addUserOrUpdateUser);
router.get("/users/delete/:userId", deleteUser);

module.exports = router;
