import React, { useEffect } from "react";
import { SkeletOnPrice } from "../../Components/Skeletons";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import UserReviews from "../../Components/UserReviews";
import { useSelector, useDispatch } from "react-redux";
import {
  addOrUpdateUserCart,
  getUserCartData,
} from "../../redux/reducers/cart";
import { addFeedback, getFeedback } from "../../redux/reducers/feedback";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const Data = useSelector((state) =>
    state.products.productsData.find((product) => product.productId == id)
  );
  const { feedbacksData } = useSelector((state) => state.feedback);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [hover, setHover] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [ReviewText, setReviewText] = React.useState("");
  const [averageReview, setAverageReview] = React.useState(0);
  const { navigate } = useNavigate();
  const [itemFoundInCart, setItemFoundInCart] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { cartData } = useSelector((state) => state.cart);

  React.useEffect(() => {
    setItemFoundInCart(
      cartData.find((item) => {
        return item.productId === Number(id);
      })
    );
  }, [cartData]);


  React.useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.user) {
        dispatch(getUserCartData(auth.user.userId));
      }
    }
  }, [auth.user]);

  console.log("cartData", itemFoundInCart,id);

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

  const handleAddReview = () => {
    if (auth.isAuthenticated) {
      let feedbackData = {
        ratings: rating,
        reviews: ReviewText,
        productId: id,
        userId: auth.user.userId,
      };
      dispatch(addFeedback(feedbackData));
      setReviewText("");
      setRating(0);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getFeedback(id));
  }, []);

  useEffect(() => {
    const sumRatings = feedbacksData.reduce(
      (acc, feedback) => acc + feedback.ratings,
      0
    );
    const averageRatings = sumRatings / feedbacksData.length;
    setAverageReview(averageRatings);
  }, [feedbacksData]);

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

  return (
    <div>
      <div className="w-[100%] h-[100%] outer">
        <div className="w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-col justify-start items-center min-h-fit  ">
          <div className="DetailsOuter Vflex AroundFlex">
            <div className="ImageWrapperDiv">
              <div className="ProductNameHeader mobileProduct p-[10px]">
                <h3>{Data ? Data.productName : ""}</h3>
              </div>
              <div className=" w-[100%] md:w-[50%] flex justify-center items-center flex-col AddGap py-[5px] px-[10px]">
                <div className="w-[100%] ProductPriceDiv mobileProduct ml-[5px]">
                  <span className="ProductPrice">
                    {Data?.productPrice ? Data.productPrice : <SkeletOnPrice />}
                  </span>
                </div>
              </div>
              {Data ? (
                <div className="DetailsImageDiv">
                  <div className="DetailsImageOuter">
                    <div className="ImageWrap">
                      <img
                        width={150}
                        className="object-fill w-full h-full aspect-video"
                        src={Data.productImage}
                        alt={"category"}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Skeleton className="h-[400px] min-w-[300px] w-[100%] rounded-[30px]" />
              )}{" "}
              <div className="w-[100%] AddToCartWrapper ">
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
                            handleChangeQuantity(-1, id);
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
                            handleChangeQuantity(1, id);
                          }}
                        >
                          +
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    className="w-[100%] h-[90%]  shadow-md rounded-md bg-yellow-300 text-green-800 text-xs font-bold  AddToCartButton"
                    onClick={() => handleProductAdd(id)}
                  >
                    {" "}
                    Add to cart
                  </button>
                )}
              </div>
            </div>

            <div className="ProductDetailsDiv">
              <div className="ProductNameHeader laptopProduct">
                <h3>
                  {Data ? (
                    Data.productName
                  ) : (
                    <Skeleton width={60} height={20} />
                  )}
                </h3>
              </div>
              <div className=" w-[100%] md:w-[50%] flex justify-center items-center flex-col AddGap laptopProduct">
                <div
                  className="w-[100%] ProductPriceDiv laptopProduct"
                  style={{ marginLeft: "5px" }}
                >
                  <span className="ProductPrice">
                    {Data ? (
                      Data.productPrice
                    ) : (
                      <Skeleton width={60} height={20} />
                    )}
                  </span>
                </div>
              </div>

              <div className="ProductInfo">
                <h2>Product Information</h2>
                <div className="w-[100%] flex flex-col md:flex-row justify-start">
                  <div className="w-[100%]">
                    <div className="ProductTable">
                      <div className="ProductTableRow">
                        <div className="ProductTableTd1">WEIGHT</div>
                        <div className="ProductTableTd2">
                          {Data ? (
                            Data.productWeight
                          ) : (
                            <Skeleton width={60} height={20} />
                          )}
                        </div>
                      </div>
                      <div className="ProductTableRow">
                        <div className="ProductTableTd1">FLAVOUR</div>
                        <div className="ProductTableTd2">
                          {Data ? (
                            Data.productFlavour
                          ) : (
                            <Skeleton width={60} height={20} />
                          )}
                        </div>
                      </div>
                      <div className="ProductTableRow">
                        <div className="ProductTableTd1">CATEGORY</div>
                        <div className="ProductTableTd2">
                          {Data ? (
                            Data.categoryId
                          ) : (
                            <Skeleton width={60} height={20} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="DescHeader">
                <h3>Description</h3>
                <p>{Data ? Data.productDescription : ""}</p>
              </div>
            </div>
          </div>
          <div className="RatingsDiv">
            <div className="RatingsWrap">
              <div className="RatingsStarDivWrap">
                <div className="RatigsStars">
                  <h1 className="H1Ratings CustomerHeader">
                    Ratings & Reviews
                  </h1>
                  <h1 className="AverageStars">{averageReview}</h1>
                  <div>
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={
                            index <= averageReview
                              ? "StarButton on"
                              : "StarButton off"
                          }
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="writeReview">
                    <h1>Write a Review</h1>
                    <p>Help others make an informed decision!</p>
                    <div className="UserTakingReview">
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={
                              index <= (hover || rating)
                                ? "UserStarReview on"
                                : "UserStarReview off"
                            }
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            <span className="starReview">&#9733;</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="InputReview">
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        value={ReviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      className="WriteReviewButton"
                      onClick={handleAddReview}
                    >
                      Post The Review{" "}
                    </button>
                  </div>
                </div>
                <div className="UserReviewsDiv">
                  <h1
                    style={{ fontSize: "xx-large", fontWeight: "700" }}
                    className="CustomerHeader"
                  >
                    Reviews from customers
                  </h1>

                  {feedbacksData.length > 0 ? (
                    feedbacksData.map((feedback, index) => {
                      return <UserReviews key={index} review={feedback} />;
                    })
                  ) : (
                    <h1>No Reviews Available</h1>
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

export default ProductDetails;
