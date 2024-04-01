import React from "react";
import PageLayout from "../layouts/PageLayout";
import PublicRoutes from "./public/PublicRoutes";
import ProtectedRoutes from "./protected/ProtectedRoutes";
import AuthRoutes from "./auth/AuthRoutes";
import Cart from "../pages/cart/Cart";
import Error404 from "../pages/Error/404";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "../Components/Orders";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          {PublicRoutes()}
          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            
          </Route>
        </Route>

        {AuthRoutes()}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
