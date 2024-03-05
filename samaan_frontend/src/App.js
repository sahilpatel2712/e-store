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
import { getProductByCategory } from "./redux/reducers/product";
import { getCategory } from "./redux/reducers/categories";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const { productsData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // const [cart, setCart] = React.useState([]);
  // const { authTokens } = React.useContext(AuthContext);
  // const fetchCart = async () => {
  //   if(authTokens){
  //   const response = await fetch(
  //     "https://api-krudra9125-gmailcom.vercel.app/api/cart/",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authTokens["access"]}`,
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log("cartfrom context fetch ",data);
  //   setCart(data);
  // };

  // }
  // React.useEffect(() => {
  //   fetchCart();
  // }, [authTokens]);

  useEffect(() => {
    if (token) {
      dispatch(userAuth({ token: token }));
    }
    dispatch(getCategory());
    // dispatch(getProductByCategory(1));
  }, []);

  return (
    <div className="  w-[100%] h-[100vh]   ">
      {/* <CartContext.Provider value={cart}> */}
      <Navigation />
      {/* </CartContext.Provider> */}
    </div>
  );
};

export default App;
