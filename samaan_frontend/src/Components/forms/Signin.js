import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../TextError";
import Input from "./Input";
import ForgotPassword from "./ForgotPassword";

const SignInForm = ({ setLogInForm }) => {
  const [forgotPasswordForm, setForgotPasswordForm] = React.useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
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
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    await fetch("https://api-krudra9125-gmailcom.vercel.app/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log(data);
        } else {
          alert("EMAIL OR PASSWORD ARE INCORRECT");
        }
      });
  };

  return (
    <div className="w-[100%] h-[21rem] flex justify-center items-center ">
      <div className="w-[100%] md:w-[80%] h-[21rem] flex justify-center items-center flex-col ">
        {!forgotPasswordForm ? (
          <div className="w-[90%] md:w-[70%]">
            <div className="w-[100%] ">
              <div className="flex flex-col my-5">
                <h1 className="flex text-3xl font-bold">Login here</h1>
                <p className="flex">
                  Hello there, we are happy to see you back.
                </p>
              </div>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form className="w-[100%]">
                <div className="w-[100%] h-[100%] flex justify-center items-center ">
                  <Field
                    className="w-[100%] h-[3rem] border border-black rounded-xl pl-2"
                    type="text"
                    required={true}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <ErrorMessage name="email" component={TextError} />
                <Input />
                <ErrorMessage name="password" component={TextError} />

                <div
                  onClick={() => {
                    setForgotPasswordForm(true);
                  }}
                  className="flex justify-end cursor-pointer w-[100%]"
                >
                  <p style={{ fontWeight: "600" }}>Forgot Password?</p>
                </div>
                <div className="w-[100%] h-[4rem] flex justify-center items-center ">
                  <button
                    type="submit"
                    className="w-[100%] h-[3rem] border border-black rounded-xl pl-2 bg-black text-white"
                  >
                    Login
                  </button>
                </div>
              </Form>
            </Formik>

            <div className="w-[100%] flex justify-center">
              Create New Account?{" "}
              <span
                onClick={() => {
                  setLogInForm(false);
                }}
                className="font-medium underline cursor-pointer"
                style={{ color: "#FF725E" }}
              >
                Click here
              </span>
            </div>
          </div>
        ) : (
          <ForgotPassword setForgotPasswordForm={setForgotPasswordForm} />
        )}
      </div>
    </div>
  );
};

export default SignInForm;
