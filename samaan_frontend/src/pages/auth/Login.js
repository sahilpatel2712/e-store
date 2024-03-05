import React from "react";
import Input from "../../Components/Input";
import TextError from "../../Components/TextError";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginInitialValues } from "../../modules/formik/initialValues";
import { loginValidationSchema } from "../../modules/formik/validationSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLog } from "../../redux/reducers/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const [forgotPasswordForm, setForgotPasswordForm] = React.useState(false);

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     const email = e.target[0].value;
  //     const password = e.target[1].value;
  //     await fetch("https://api-krudra9125-gmailcom.vercel.app/api/login/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: email, password: password }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.status === 200) {
  //           console.log(data);
  //         } else {
  //           alert("EMAIL OR PASSWORD ARE INCORRECT");
  //         }
  //       });
  //   };

  const handleLogin = async (value) => {
    dispatch(userLog(value));
    navigate("/");
  };

  return (
    <div className="w-[100%] h-[21rem] flex justify-center items-center ">
      <div className="w-[100%] md:w-[80%] h-[21rem] flex justify-center items-center flex-col ">
        <div className="w-[90%] md:w-[70%]">
          <div className="w-[100%] ">
            <div className="flex flex-col my-5">
              <h1 className="flex text-3xl font-bold">Login here</h1>
              <p className="flex">Hello there, we are happy to see you back.</p>
            </div>
          </div>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            <Form className="w-[100%]">
              <div className="w-[100%] h-[100%] flex justify-center items-center ">
                <Field
                  className="w-[100%] h-[3rem] border border-black rounded-lg pl-2"
                  type="text"
                  required={true}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <ErrorMessage name="email" component={TextError} />
              <Input name={"password"} />
              <ErrorMessage name="password" component={TextError} />

              <div
                onClick={() => {
                  navigate("/forgetPassword");
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
                navigate("/signup");
              }}
              className="font-medium underline cursor-pointer"
              style={{ color: "#FF725E" }}
            >
              Click here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
