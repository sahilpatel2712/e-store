const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  getProducts,
} = require("../../controllers/productController");
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:categoryId", getProductsByCategoryId);
router.post("/products/add", addProduct);
router.post("/products/update/:productId", updateProduct);
router.post("/products/delete/:productId", deleteProduct);

module.exports = router;
