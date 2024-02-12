import React from "react";
import { Route, Routes } from "react-router-dom";
import ForgetPassThroughEmail from "../forms/ForgotPassThroughEmail";
import Cart from "../Cart";
import OnSearch from "../OnSearch";
import DetailsMain from "../DetailsMain";
import Home from "../../Home";
import Main from "../../Main";
import UserForm from "../forms/UserForm";
import ChangePassword from "../forms/ChangePassword";

function AppRouter() {
  return (
    <Routes>
      <Route to="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<DetailsMain />} />
        <Route path="/search/:id" element={<OnSearch />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/signup" element={<UserForm />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route
        path="/forgotPasswordEmail/:a/:b"
        element={<ForgetPassThroughEmail />}
      />
    </Routes>
  );
}

export default AppRouter;
