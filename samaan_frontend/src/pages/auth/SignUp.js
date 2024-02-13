import React from "react";
import Input from "../../Components/Input";
import TextError from "../../Components/TextError";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { signupInitialValues } from "../../modules/formik/initialValues";
import { signupValidationSchema } from "../../modules/formik/validationSchema";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setLogInForm }) => {
  const navigate = useNavigate();

  const handleSignup = (value) => {
    console.log(value);
    // const email = e.target[0].value;
    // const name = e.target[1].value;
    // const address = e.target[4].value;
    // if (password === password2) {
    //   fetch("https://api-krudra9125-gmailcom.vercel.app/api/register/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //       password2: password,
    //       tc: "True",
    //       name: name,
    //       address: address,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data["message"]) {
    //         console.log(data);
    //       } else {
    //         alert("EMAIL already exist");
    //       }
    //     });
    // } else {
    //   alert("PASSWORD DOES NOT MATCH");
    // }
  };

  return (
    <>
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
        <div className="w-[100%] md:w-[80%] h-[100%] flex justify-center items-center flex-col ">
          <div className="w-[90%] md:w-[70%] ">
            <div className="flex flex-col my-5">
              <h1 className="flex text-3xl font-bold">Create an Account</h1>
              <p className="flex">
                Hello there, Let's start your journey with us.
              </p>
            </div>
          </div>
          <Formik
            initialValues={signupInitialValues}
            validationSchema={signupValidationSchema}
            onSubmit={(val) => console.log(val)}
          >
            <Form className="w-[90%] md:w-[70%]">
              <div className="w-[100%] h-[3rem] flex justify-center items-center ">
                <Field
                  className="w-[100%] h-[2.5rem] border border-black rounded-lg pl-2"
                  type="email"
                  placeholder="Email"
                  name="email"
                  style={{ borderColor: "#455A64" }}
                />
              </div>
              <ErrorMessage name="email" component={TextError} />

              <Input
                inputHeight={"2.5rem"}
                name={"password"}
                height={"3rem"}
                placeholder="Password"
              />
              <ErrorMessage name="password" component={TextError} />
              <Input
                inputHeight={"2.5rem"}
                name={"confirmPassword"}
                height="3rem"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="password2" component={TextError} />
              <div className="w-[100%] h-[3rem] flex justify-center items-center ">
                <Field
                  className="w-[100%] h-[2.5rem] border border-black rounded-lg pl-2"
                  type="text"
                  placeholder="Name"
                  name="name"
                  style={{ borderColor: "#455A64" }}
                />
              </div>
              <ErrorMessage name="name" component={TextError} />
              <div className="w-[100%] h-[3rem] flex justify-center items-center ">
                <Field
                  as="textarea"
                  className="w-[100%] h-[2.5rem] flex justify-center items-center border border-black pl-2 rounded-lg"
                  placeholder="enter your address"
                  name="address"
                  style={{ borderColor: "#455A64" }}
                />
              </div>
              <ErrorMessage name="address" component={TextError} />
              <div className="w-[100%] h-[4rem] flex justify-center items-center ">
                <button
                  className="w-[100%] h-[2.5rem] border border-black rounded-lg pl-2 bg-black text-white"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <div className="flex items-center justify-center">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="font-medium underline cursor-pointer"
                  style={{ color: "#FF725E" }}
                >
                  login now
                </span>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default SignUp;
