const express = require("express");
const { getAllCarts,cartForm,updateCartItem,deleteCart } = require("../../controllers/admin/cartController");


const router = express.Router();

router.get("/carts", getAllCarts);
router.get("/carts/form/:cartId", cartForm);
router.post("/carts/save/:cartId",updateCartItem );
router.get("/carts/delete/:cartId", deleteCart);

module.exports = router;
