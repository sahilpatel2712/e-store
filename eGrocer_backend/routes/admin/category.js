const express = require("express");
const { getCategory,categoryForm,addOrUpdateCategory,deleteCategory } = require("../../controllers/admin/categoryController");


const router = express.Router();

router.get("/categories", getCategory);
router.get("/categories/form/:categoryId", categoryForm);
router.post("/categories/save/:categoryId",addOrUpdateCategory );
router.get("/categories/delete/:categoryId", deleteCategory);

module.exports = router;
