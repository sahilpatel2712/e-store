import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      "Enter valid email"
    )
    .required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/,
      "Enter strong password"
    )
    .required("Required"),
});

export const signupValidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      "Enter valid email"
    )
    .required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/,
      "Enter strong password"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

export const forgetPassValidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      "Enter valid email"
    )
    .required("Required"),
});

export const changePassValidationSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/,
      "Enter strong password"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/,
      "Enter strong password"
    )
    .required("Required"),
});
