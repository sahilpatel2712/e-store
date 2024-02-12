import React from "react";
import "./App.css";
import "./loader.css";
import AuthContext from "./context/Auth";
import CartContext from "./context/CartContext";
import AppRouter from "./Components/Routers/AppRouter";
const App = () => {
  const [cart, setCart] = React.useState([]);
  const { authTokens } = React.useContext(AuthContext);
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
  return (
    <div className="  w-[100%] h-[100vh]   ">
      <CartContext.Provider value={cart}>
        <AppRouter />
      </CartContext.Provider>
    </div>
  );
};

export default App;
