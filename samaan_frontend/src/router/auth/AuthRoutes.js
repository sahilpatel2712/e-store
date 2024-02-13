import React from "react";
import { Route } from "react-router-dom";

import ForgetPass from "../../pages/auth/ForgetPass";
import Login from "../../pages/auth/Login";
import AuthLayout from "../../layouts/AuthLayout";
import SignUp from "../../pages/auth/SignUp";
import ChangePassByEmail from "../../pages/auth/ChangePassByEmail";

const AuthRoutes = () => {
  return (
    <>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetPassword" element={<ForgetPass />} />
        <Route
          path="/forgotPasswordEmail/:a/:b"
          element={<ChangePassByEmail />}
        />
      </Route>
    </>
  );
};

export default AuthRoutes;
