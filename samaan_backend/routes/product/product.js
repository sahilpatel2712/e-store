const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../../controllers/productController");
const router = express.Router();

router.get("/products", getProduct);
router.post("/products/add", addProduct);
router.post("/products/update/:productId", updateProduct);
router.post("/products/delete/:productId", deleteProduct);

module.exports = router;
