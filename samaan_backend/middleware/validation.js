const { check, body } = require("express-validator");

const validators = [
  check("email")
    .matches(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    .withMessage("Please Enter valid email"),
  check("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/
    )
    .withMessage("Please Enter strong password"),
];

module.exports = {
  validators,
};
