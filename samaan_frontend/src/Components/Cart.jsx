import React from "react";
import CartCard from "./CartCard";
import "./Cart.css";
import AuthContext from "../context/Auth";
import { SkeletonCart } from "./Skeletons/Skeletons";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const { authTokens,updateToken } = React.useContext(AuthContext);
  const [cartData, setCartData] = React.useState([]);
  const [FetchState, setFetchState] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const fetchCart = async () => {
    if (authTokens) {
      const response = await fetch(
        "https://api-krudra9125-gmailcom.vercel.app/api/cart/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens["access"]}`,
          },
        }
      );
      const data = await response.json();
      if (data["detail"])
      {
        
        setFetchState(false);
        await updateToken().then(()=>{fetchCart()})
        
      }
      else{
      setFetchState(true);
      setCartData(data);
      console.log(data);
      }
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchCart();
  }, []);
  React.useEffect(() => {
    let sum = 0;
    cartData?.map((item) => {
      console.log(sum,item["product"]["price"],item["quantity"]);
      sum = sum + item["product"]["price"] * item["quantity"];
      return null;
    });
    console.log(sum);
    setTotal(sum);
  }, [cartData]);

  const changeSubtotal = (value)=>{
    const newTotal = total + value
    setTotal(newTotal)
  }

  return (
    <div className="w-[100%] min-h-[100vh] mt-[8rem]">
      <div className="responsive w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-row justify-start  min-h-fit  ">
        <div className="CartOuter">
          <div className="CartHeader">
            <h1>Shopping Cart</h1>
          </div>
          <hr />
          <div className="CartWrapper">
            {FetchState ? (
              cartData && cartData.length !== 0 ? (
                cartData.map((item) => {
                  return (
                    <CartCard
                      productId= {item["product"]['id']}
                      name={item["product"]["name"]}
                      price={item["product"]["price"]}
                      imagSrc={item["product"]["img_path"]}
                      Quantity={item["quantity"]}
                      changeQuantity = {changeSubtotal}
                    
                    />
                  );
                })
              ) : (
                <h1 style={{fontSize:'xx-large'}}>No Items Added</h1>
              )
            ) : (
              [1, 1, 1, 1, 1].map((item) => {
                return <SkeletonCart />;
              })
            )}
          </div>
        </div>
        <div className="SubtotalOuter">
          <div className="SubtotalCard">
            <div className="SubtotalHeader">
              <p>
                Subtotal : <span>{total}</span>
              </p>
            </div>
            <button>Proceed To Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
