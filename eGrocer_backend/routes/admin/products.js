const express = require("express");

const { validators } = require("../../middleware/validation");
const { getProducts, productForm,addOrUpdateProduct,deleteProduct } = require("../../controllers/admin/productController");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/form/:productId", productForm);
router.post("/products/save/:productId",addOrUpdateProduct );
router.get("/products/delete/:productId", deleteProduct);

module.exports = router;
