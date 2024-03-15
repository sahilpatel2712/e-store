const express = require("express");
const {
  updateProduct,
  getProductsByCategoryId,
  getProducts,
} = require("../../controllers/productController");
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:categoryId", getProductsByCategoryId);
router.post("/products/update/:productId", updateProduct);

module.exports = router;
