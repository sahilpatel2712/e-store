const express = require("express");
const { isAdminAuthenticated } = require("../../middleware/adminAuth");
const router = express.Router();

router.use("/admin", require("./admin"));
router.use("/admin",isAdminAuthenticated, require("./users"));
router.use("/admin",isAdminAuthenticated, require("./products"));
router.use("/admin",isAdminAuthenticated, require("./category"));
router.use("/admin",isAdminAuthenticated, require("./feedback"));
router.use("/admin",isAdminAuthenticated, require("./carts"));
router.use("/admin",isAdminAuthenticated, require("./orders"));

module.exports = router;
