import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Auth";
import { useNavigate } from "react-router-dom";
const ProductCardTwo = ({
  cartQuantity,
  productId,
  imgSrc,
  name,
  price,
  weight,
}) => {
  const [quantity, setQuantity] = React.useState(
    cartQuantity !== undefined ? cartQuantity : 0
  );
  const navigate = useNavigate();
  const changeQuantity = async (q) => {
    // if (authTokens["access"]) {
    //   const response = await fetch(
    //     "https://api-krudra9125-gmailcom.vercel.app/api/cart/",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${authTokens["access"]}`,
    //       },
    //       body: JSON.stringify({ product: productId, quantity: q }),
    //     }
    //   );
    //   const data = await response.json();
    //   console.log(data);
    // }
  };

  return (
    <div className="flex justify-center">
      <div class="Card shadow-lg  ">
        <div class="CardImage">
          <Link to={`/product/${productId}`}>
            <img className="imageclass" src="https://media.istockphoto.com/id/517109442/photo/chocolate-chip-cookie-isolated.jpg?s=612x612&w=0&k=20&c=RgZOYwzVRTXnIBy8zSkXK-wJfNBy9w023UGULkbH_VE=" alt="" />
          </Link>
        </div>
        <div class="contentOuter">
          <div class="Timer">
            <div class="SvgTimerIcon">
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 14V11M12 6C7.85786 6 4.5 9.35786 4.5 13.5C4.5 17.6421 7.85786 21 12 21C16.1421 21 19.5 17.6421 19.5 13.5C19.5 11.5561 18.7605 9.78494 17.5474 8.4525M12 6C14.1982 6 16.1756 6.94572 17.5474 8.4525M12 6V3M19.5 6.5L17.5474 8.4525M12 3H9M12 3H15"
                    stroke="rgb(54, 54, 54)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
            {/* <div class="TimerText">20 MINS</div> */}
          </div>
          <div class="Desc">
            <div class="Title">
              <div class="TitleText">{name}</div>
              <div class="Stock">{weight}</div>
            </div>
            <div class="price">
              <div class="PriceText">{price}</div>
              <div class="AddButton">
                {quantity > 0 ? (
                  <div className="w-[100%] h-[100%] flex justify-around">
                    <div className="w-[33.33%] h-[100%]">
                      <div
                        className="bg-[rgb(247, 255, 249)] w-[1.4rem] h-[1.4rem] text-center font-[900] text-green-800  rounded-full cursor-pointer flex justify-center items-center border border-green-600 "
                        onClick={() => {
                          if (quantity > 0) {
                            setQuantity(quantity - 1);
                            changeQuantity(-1);
                          } else {
                            setQuantity(0);
                          }
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>
                    <div className="w-[33.33%] h-[100%]flex justify-center items-center text-center">
                      {" "}
                      {quantity}
                    </div>
                    <div className="w-[33.33%] h-[100%] ">
                      <div
                        className="bg-[rgb(247, 255, 249)] w-[1.4rem] h-[1.4rem] text-center font-[900] text-green-800  rounded-full cursor-pointer flex justify-center items-center border border-green-600"
                        onClick={() => {
                          setQuantity(quantity + 1);
                          changeQuantity(1);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      // if (authTokens) {
                      //   setQuantity(quantity + 1);
                      //   changeQuantity(1);
                      // } else {
                      //   navigate("/signup");
                      // }
                    }}
                  >
                    ADD
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTwo;
