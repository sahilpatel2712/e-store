import React from "react";
import { Route } from "react-router-dom";

import Login from "../../pages/auth/Login";
import AuthLayout from "../../layouts/AuthLayout";
import SignUp from "../../pages/auth/SignUp";

const AuthRoutes = () => {
  return (
    <>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </>
  );
};

export default AuthRoutes;
