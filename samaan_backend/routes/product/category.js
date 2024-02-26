const express = require("express");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../../controllers/categoryController");
const router = express.Router();

router.get("/category", getCategory);
router.post("/category/add", addCategory);
router.post("/category/update/:categoryId", updateCategory);
router.post("/category/delete/:categoryId", deleteCategory);

module.exports = router;
