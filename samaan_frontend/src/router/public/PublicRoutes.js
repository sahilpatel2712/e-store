import React from "react";
import Home from "../../pages/landingPage/Home";
import ProductDetails from "../../pages/prooduct/ProductDetails";
import Search from "../../pages/search/Search";

import { Route } from "react-router-dom";
import CategoryProducts from "../../Components/CategoryProducts";

const PublicRoutes = () => {
  return (
    <>
      <Route index element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/search/:id" element={<Search />} />
      <Route path="/category/:id" element={<CategoryProducts />} />
    </>
  );
};

export default PublicRoutes;
