import React from "react";
import TextError from "../../Components/TextError";
import BackIcon from "../../aseets/icons/BackIcon";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { forgetPassInitialValues } from "../../modules/formik/initialValues";
import { forgetPassValidationSchema } from "../../modules/formik/validationSchema";
import { useNavigate } from "react-router-dom";

const FogetPass = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="w-[100%] flex flex-col items-center justify-center">
        <div className="w-[90%] md:w-[70%] flex">
          <div
            className="border border-black cursor-pointer rounded-2xl hover:shadow-lg"
            onClick={() => navigate("/login")}
          >
            <BackIcon />
          </div>
        </div>
        <Formik
          initialValues={forgetPassInitialValues}
          validationSchema={forgetPassValidationSchema}
          onSubmit={(val) => console.log(val)}
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
};

export default FogetPass;
