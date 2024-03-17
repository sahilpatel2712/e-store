import React, { useEffect } from "react";
import Navigation from "./router/Navigation";

import "./styles/input.css";
import "./styles/index.css";
import "./styles/cardtwo.css";
import "./styles/app.css";
import "./styles/loader.css";
import "./styles/carousel.css";
import "./styles/cart.css";
import "./styles/cartCard.css";
import "./styles/categories.css";
import "./styles/categoriesCard.css";
import "./styles/detailsMain.css";
import "./styles/divcss.css";
import "./styles/footer.css";
import "./styles/onSearch.css";
import "./styles/onSearchLeft.css";
import "./styles/onSearchRight.css";
import "./styles/header.css";

import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "./redux/reducers/auth";
import { getProduct } from "./redux/reducers/product";
import { getCategory } from "./redux/reducers/categories";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== "null") {
      dispatch(userAuth({ token: token }));
    }
    dispatch(getCategory());
    dispatch(getProduct());
  }, []);

  return (
    <div className="  w-[100%] h-[100vh]   ">
      <Navigation />
    </div>
  );
};

export default App;
