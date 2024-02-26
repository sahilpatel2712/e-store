const express = require("express");
const {
  getOrderDetails,
  addOrders,
} = require("../../controllers/orderController");
const { authenticateUser } = require("../../middleware/authentication");

const router = express.Router();

router.get("/user/:userId/order", authenticateUser, getOrderDetails);
router.get("/order/:orderId", authenticateUser, getOrderDetails);
router.get("/order", authenticateUser, getOrderDetails);
router.post("/order/add", authenticateUser, addOrders);

module.exports = router;
