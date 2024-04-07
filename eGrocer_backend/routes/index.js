const express = require("express");
const router = express.Router();

router.use("", require("./users/auth"));
router.use("", require("./product/category"));
router.use("", require("./product/product"));
router.use("", require("./product/feedback"));
router.use("", require("./cart/cart"));
router.use("/orders", require("./orders/order"));
module.exports = router;
