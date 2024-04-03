import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import { changePassInitialValues } from "../../modules/formik/initialValues";
import { changePassValidationSchema } from "../../modules/formik/validationSchema";

import TextError from "../../Components/TextError";
import Input from "../../Components/Input";

const ChangePassByEmail = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-[100%] h-[21rem] flex justify-center items-center ">
      <div className="w-[100%] md:w-[80%] h-[21rem] flex justify-center items-center flex-col ">
        <div className="w-[90%] md:w-[70%]">
          <div className="w-[100%] ">
            <div className="flex flex-col my-5">
              <h1 className="flex text-3xl font-bold">Change Password</h1>
              <p className="flex">Your Password Must be Strong.</p>
            </div>
          </div>
          <Formik
            initialValues={changePassInitialValues}
            validationSchema={changePassValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // Handle form submission here
              resetForm(); // Reset the form after successful submission
            }}
          >
            <Form className="w-[100%]">
              <Input name={"password"} />
              <ErrorMessage name="password" component={TextError} />
              <Input name={"confirmPassword"} />
              <ErrorMessage name="confirmPassword" component={TextError} />

              <div className="w-[100%] h-[4rem] flex justify-center items-center ">
                <button
                  type="submit"
                  className="w-[100%] h-[3rem] border border-black rounded-xl pl-2 bg-black text-white"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>

          <div className="w-[100%] flex justify-center">
            Go to Login?{" "}
            <span
              onClick={() => {
                navigate("/login");
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

export default ChangePassByEmail;
