import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addOrUpdateUserCart } from "../redux/reducers/cart";
const ProductCardTwo = ({ productId, imgSrc, name, price, weight }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const handleProductAdd = (productId) => {
    if (auth.isAuthenticated) {
      dispatch(
        addOrUpdateUserCart({
          userId: auth.user.userId,
          productId: productId,
          quantity: 1,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="Card shadow-lg  ">
        <div className="CardImage">
          <Link to={`/product/${productId}`}>
            <img className="imageClass" src={imgSrc} alt={name} />
          </Link>
        </div>
        <div className="contentOuter">
          <div className="Timer">
            <div className="SvgTimerIcon">
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12 14V11M12 6C7.85786 6 4.5 9.35786 4.5 13.5C4.5 17.6421 7.85786 21 12 21C16.1421 21 19.5 17.6421 19.5 13.5C19.5 11.5561 18.7605 9.78494 17.5474 8.4525M12 6C14.1982 6 16.1756 6.94572 17.5474 8.4525M12 6V3M19.5 6.5L17.5474 8.4525M12 3H9M12 3H15"
                    stroke="rgb(54, 54, 54)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
            </div>
            {/* <div className="TimerText">20 MINS</div> */}
          </div>
          <div className="Desc">
            <div className="Title">
              <div className="TitleText">{name}</div>
              <div className="Stock">{weight}</div>
            </div>
            <div className="price">
              <div className="PriceText">{price}</div>
              <div className="AddButton">
                <div className="w-[100%] h-[100%] flex justify-around">
                  <button onClick={() => handleProductAdd(productId)}>
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTwo;
