const express = require("express");
const {
  getCategory,
} = require("../../controllers/categoryController");
const router = express.Router();

router.get("/category", getCategory);


module.exports = router;
