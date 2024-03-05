const express = require("express");
const {
  addOrUpdateCartItem,
  getAllCarts,
  getUserCart,
  deleteCartByUserId,
} = require("../../controllers/cartController");

const router = express.Router();

router.get("/cart", getAllCarts);
router.get("/cart/:userId", getUserCart);
router.post("/cart/add", addOrUpdateCartItem);
router.post("/cart/delete/:cartId", deleteCartByUserId);

module.exports = router;
