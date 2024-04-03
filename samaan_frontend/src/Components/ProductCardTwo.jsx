import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import cart, {
  addOrUpdateUserCart,
  getUserCartData,
} from "../redux/reducers/cart";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
const ProductCardTwo = ({
  productId,
  imgSrc,
  name,
  price,
  weight,
  quantity,
}) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const [itemFoundInCart, setItemFoundInCart] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleProductAdd = async (productId) => {
    if (auth.isAuthenticated && auth.user) {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/add`, {
        data: {
          userId: auth.user.userId,
          productId: productId,
          quantity: 1,
        },
      });
      dispatch(getUserCartData(auth.user.userId));
      setLoading(false);
    } else {
      navigate("/login");
    }
  };

  const handleChangeQuantity = async (quantity, productId) => {
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_BASE_URL}/cart/add`, {
      data: {
        userId: auth.user.userId,
        productId: productId,
        quantity: quantity,
      },
    });
    dispatch(getUserCartData(auth.user.userId));
    setLoading(false);
  };

  React.useEffect(() => {
    setItemFoundInCart(
      cartData.find((item) => {
        return item.productId === productId;
      })
    );
    console.log("cartData", cartData);
  }, [cartData]);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.user) {
        dispatch(getUserCartData(auth.user.userId));
      }
    }
  }, [auth.user]);

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
            {quantity < 5 ? (
              <div
                className="TimerText"
                style={{ color: "red", marginLeft: 10 }}
              >
                ! Only Few Left
              </div>
            ) : null}
          </div>
          <div className="Desc">
            <div className="Title">
              <div className="TitleText">{name}</div>
              <div className="Stock">{weight}</div>
            </div>
            <div className="price d-flex justify-content-between pb-0  align-items-center ">
              <div className="PriceText pb-0">{price}</div>
              <div className="d-flex justify-content-center  align-items-center ">
                <div className="w-[100%] h-[100%] flex justify-around">
                  {itemFoundInCart ? (
                    <>
                      <div className="px-2 d-flex align-items-center">
                        {loading ? (
                          <Skeleton width={20} height={20} />
                        ) : (
                          <button
                            className="bg-yellow-300 text-black px-2 d-flex justify-content-center align-items-center "
                            style={{
                              borderRadius: "50%",
                              height: "fit-content",
                            }}
                            onClick={() => {
                              handleChangeQuantity(-1, productId);
                            }}
                          >
                            -
                          </button>
                        )}
                        <div className="d-flex justify-content-center align-items-center p-2">
                          {loading ? (
                            <Skeleton width={20} height={20} />
                          ) : (
                            itemFoundInCart.quantity
                          )}
                        </div>
                        {loading ? (
                          <Skeleton width={20} height={20} />
                        ) : (
                          <button
                            className="bg-yellow-300 text-black px-2 d-flex justify-content-center align-items-center "
                            style={{
                              borderRadius: "50%",
                              height: "fit-content",
                            }}
                            onClick={() => {
                              handleChangeQuantity(1, productId);
                            }}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </>
                  ) : loading ? (
                    <Skeleton width={20} height={20} />
                  ) : (
                    <button
                      className="px-3 bg-yellow-300 text-black px-2 d-flex justify-content-center align-items-center rounded"
                      onClick={() => handleProductAdd(productId)}
                      style={{ fontSize: "15px" }}
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
    </div>
  );
};

export default ProductCardTwo;
