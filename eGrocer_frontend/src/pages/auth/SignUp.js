import React from "react";
import Input from "../../Components/Input";
import TextError from "../../Components/TextError";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { signupInitialValues } from "../../modules/formik/initialValues";
import { signupValidationSchema } from "../../modules/formik/validationSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userCreate } from "../../redux/reducers/auth";

const SignUp = ({ setLogInForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (value) => {
    dispatch(userCreate(value));
    navigate("/")
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
            onSubmit={handleSignup}
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
              <ErrorMessage name="confirmPassword" component={TextError} />
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
