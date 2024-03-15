const express = require("express");
const passport = require("../../controllers/admin/passport");

const {
  getHome,
  adminLoginForm,
  adminSignupForm,
} = require("../../controllers/admin/adminController");
const { isAdminAuthenticated } = require("../../middleware/adminAuth");

const router = express.Router();

router.get("/", adminLoginForm);
router.get("/registration", adminSignupForm);
router.get("/dashboard", isAdminAuthenticated, getHome);
router.post(
  "/register-submit",
  passport.authenticate("local-register", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/register",
    failureFlash: true,
  })
);
router.post(
  "/login-submit",
  passport.authenticate("local-login", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin",
    failureFlash: false,
  })
);
router.get("/logout", (req, res) => {
  req.logOut((err) => {
    console.log(err);
  });
  res.redirect("/admin");
});

module.exports = router;
