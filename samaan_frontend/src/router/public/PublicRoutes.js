import React from "react";
import Home from "../../pages/landingPage/Home";
import ProductDetails from "../../pages/prooduct/ProductDetails";
import Search from "../../pages/search/Search";

import { Route } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/search/:id" element={<Search />} />
    </>
  );
};

export default PublicRoutes;
