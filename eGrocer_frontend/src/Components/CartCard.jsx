import React, { useState } from "react";
const CartCard = ({
  productId,
  Quantity,
  imagSrc,
  name,
  price,
  handleChangeQuantity,
}) => {
  const [quantity, setQuantity] = useState(Quantity);

  return quantity === 0 ? (
    <h1 style={{ fontSize: "xx-large" }}>No Items Added</h1>
  ) : (
    <div className="CartCardOuter">
      <div className="CartCardWrapper">
        <div className="ImageCart">
          <img src={imagSrc} alt="" srcSet="" />
        </div>
        <div className="CartDetails">
          <div className="ProductNameCart">
            <h3>{name}</h3>
          </div>
          <div className="PriceCart">
            <p>{price}</p>
          </div>
          <div className="QuantityCart" style={{ padding: "0px 0px" }}>
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
                        handleChangeQuantity(-1, productId);
                        setQuantity((prev) => prev - 1);
                      } else {
                        setQuantity(0);
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
                      handleChangeQuantity(1, productId);
                      setQuantity((prev) => prev + 1);
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
