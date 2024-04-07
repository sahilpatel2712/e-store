const express = require("express");
const {
  getOrderDetails,
  updateOrder,
  deleteOrder,
  orderInfo,
  orderUpdateView
} = require("../../controllers/admin/orderController");

const router = express.Router();

router.get("/orders", getOrderDetails);
router.get("/orders/:orderId/info", orderInfo);
router.get("/orders/:orderId/update", orderUpdateView);
router.post("/orders/save/:orderId", updateOrder);
router.get("/orders/delete/:orderId", deleteOrder);

module.exports = router;
