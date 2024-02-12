import React from "react";
import { Navigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../TextError";

function ForgotPassword({ setForgotPasswordForm }) {
  const initialValues = {
    name: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        "Enter valid email"
      )
      .required("Required"),
  });

  const handleForgotPassword = async (value) => {
    console.log(value);
    // const email = e.target[0].value;
    // await fetch(
    //   "https://api-krudra9125-gmailcom.vercel.app/api/send-reset-password/",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: email }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data["errors"]) {
    //       console.log(data);
    //       alert("user not found");
    //     } else {
    //       console.log(data);
    //       Navigate("/");
    //       alert("email sent");
    //     }
    //   });
  };
  return (
    <>
      <div className="w-[100%] flex flex-col items-center justify-center">
        <div className="w-[90%] md:w-[70%] flex">
          <div
            className="border border-black cursor-pointer rounded-2xl hover:shadow-lg"
            onClick={() => setForgotPasswordForm(false)}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#000000"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                ></path>
                <path
                  fill="#000000"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          <Form className="w-[90%] md:w-[70%]">
            <div className="w-[100%] ">
              <div className="flex flex-col my-5">
                <h1 className="flex text-3xl font-bold">
                  Forget your Password
                </h1>
              </div>
            </div>
            <div className="w-[100%] h-[4rem] flex justify-center items-center ">
              <Field
                name="email"
                className="w-[100%] h-[3rem] border border-black rounded-lg pl-2"
                type="text"
                placeholder="Enter Your Email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
            </div>
            <ErrorMessage name="email" component={TextError} />

            <div className="w-[100%] h-[4rem] flex justify-center items-center ">
              <button className="w-[100%] h-[3rem] border border-black rounded-lg pl-2 bg-black text-white">
                Send
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default ForgotPassword;
