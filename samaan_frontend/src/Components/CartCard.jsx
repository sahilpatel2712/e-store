import React, { useState } from "react";
import AuthContext from "../context/Auth";
// import logo from "./Test.png";
const CartCard = ({
  productId,
  Quantity,
  imagSrc,
  name,
  price,
  changeQuantity,
}) => {
  // const [QuantityEditState, setQuantityEditState] = useState(false);
  const [quantity, setQuantity] = useState(Quantity);
  // const [prevQuantity, setPrevQuantity] = useState(price * Quantity);
  // const handleQuantityEdit = () => {
  //   console.log(QuantityEditState);
  //   if (QuantityEditState) {
  //     console.log(prevQuantity);
  //     console.log(price * quantity - prevQuantity);
  //     changeQuantity(price * quantity - prevQuantity);
  //     setPrevQuantity(price * quantity);
  //   }
  //   setQuantityEditState(!QuantityEditState);
  // };
  const { authTokens } = React.useContext(AuthContext);
  const handleChangeQuantity = async (q) => {
    if (authTokens["access"]) {
      const response = await fetch(
        "https://api-krudra9125-gmailcom.vercel.app/api/cart/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens["access"]}`,
          },
          body: JSON.stringify({ product: productId, quantity: q }),
        }
      );
      const data = await response.json();
      console.log(data);
    }
  };
  // const handleQuantityChange = (e) => {
  //   setQuantity(e.target.value);
  // };
  return (
    <div className="CartCardOuter">
      <div className="CartCardWrapper">
        <div className="ImageCart">
          <img src={imagSrc} alt="" srcset="" />
        </div>
        <div className="CartDetails">
          <div className="ProductNameCart">
            <h3>{name}</h3>
          </div>
          <div className="PriceCart">
            <p>{price * quantity}</p>
          </div>
          <div className="QuantityCart" style={{ padding: "0px 0px" }}>
            {/* <p
              style={
                QuantityEditState ? { display: "flex" } : { display: "none" }
              }
            >
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ padding: "0 5px" }}
              />
            </p>
            <p
              style={
                QuantityEditState ? { display: "none" } : { display: "flex" }
              }
            >
              {quantity}
            </p>
            <div className="" onClick={handleQuantityEdit}>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={
                  QuantityEditState ? { display: "none" } : { display: "flex" }
                }
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
                    fill="#080341"
                  ></path>{" "}
                </g>
              </svg>
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="20px"
                height="20px"
                viewBox="0 0 335.765 335.765"
                space="preserve"
                style={
                  QuantityEditState ? { display: "flex" } : { display: "none" }
                }
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795 "></polygon>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div> */}
            <div
              className="w-[100%] AddToCartWrapper "
              style={{ display: "block", padding: "0px 0px" }}
            >
              <div className="w-[8rem] h-[100%] flex justify-center items-center MobileSizeCart">
                <div className="w-[33.33%] h-[100%] flex justify-center">
                  <div
                    className=" bg-yellow-300  text-center font-[900] QuantityIcon text-green-800  rounded-full cursor-pointer pillsMobile"
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                        //  handleChangeQuantity(-1);
                        changeQuantity(-price);
                        handleChangeQuantity(-1);
                      } else {
                        setQuantity(0);
                        window.location.reload();
                      }
                    }}
                  >
                    -
                  </div>
                </div>
                <div className="w-[33.33%] h-[100%] flex justify-center items-center text-center">
                  {" "}
                  {quantity}
                </div>
                <div className="w-[33.33%] h-[100%] flex justify-center ">
                  <div
                    className="bg-yellow-300  text-cent er font-[900] text-green-800  rounded-full cursor-pointer QuantityIcon pillsMobile"
                    onClick={() => {
                      setQuantity(quantity + 1);
                      //  handleChangeQuantity(1);
                      changeQuantity(price);
                      handleChangeQuantity(1);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
