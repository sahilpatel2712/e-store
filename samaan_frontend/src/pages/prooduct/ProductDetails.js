import React from "react";
import { SkeletOnPrice } from "../../Components/Skeletons";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import UserReviews from "../../Components/UserReviews";
const Data = {
  name: "Product Name",
  price: "Product Price",
  img_path: "/cadbury-chocobakes-chocofilled-cookies.png",
  brand: "Product Brand",
  weight: "Product Weight",
  flavour: "Product Flavour",
  category: "Product Category",
};

const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(0);
  const [hover, setHover] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [ReviewText, setReviewText] = React.useState("");
  const [Reviews, setReviews] = React.useState([]);
  const [averageReview, setAverageReview] = React.useState(0);
  const [method, setMethod] = React.useState("POST");
  const [authTokens, setAuthTokens] = React.useState();
  const { navigate } = useNavigate();

  const changeQuantity = (value) => {
    if (quantity === 0) {
      setMethod("POST");
    } else {
      setMethod("PATCH");
    }
  };
  const handleAddReview = () => {
    if (authTokens) {
      if (method === "POST") {
        // Add Review
      } else {
        // Edit Review
      }
    } else {
      navigate("/signup");
    }
  };
  return (
    <div>
      <div className="w-[100%] h-[100%] outer">
        <div className="w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-col justify-start items-center min-h-fit  ">
          <div className="DetailsOuter Vflex AroundFlex">
            <div className="ImageWrapperDiv">
              <div className="ProductNameHeader mobileProduct p-[10px]">
                <h3>{Data ? Data["name"] : ""}</h3>
              </div>
              <div className=" w-[100%] md:w-[50%] flex justify-center items-center flex-col AddGap py-[5px] px-[10px]">
                <div className="w-[100%] ProductPriceDiv mobileProduct ml-[5px]">
                  <span className="ProductPrice">
                    {Data?.price ? Data["price"] : <SkeletOnPrice />}
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
                        src={`${Data["img_path"]}`}
                        alt={"category"}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <Skeleton className="h-[400px] min-w-[300px] w-[100%] rounded-[30px]" />
              )}{" "}
              <div className="w-[100%] AddToCartWrapper ">
                {quantity > 0 ? (
                  <div className="w-[8rem] h-[100%] flex justify-center items-center">
                    <div className="w-[33.33%] h-[100%] flex justify-center">
                      <div
                        className=" bg-yellow-300  text-center font-[900] QuantityIcon text-green-800  rounded-full cursor-pointer "
                        onClick={() => {
                          if (quantity > 0) {
                            setQuantity(quantity - 1);
                            changeQuantity(-1);
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
                        className="bg-yellow-300  text-center font-[900] text-green-800  rounded-full cursor-pointer QuantityIcon "
                        onClick={() => {
                          setQuantity(quantity + 1);
                          changeQuantity(1);
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    className="w-[100%] h-[90%]  shadow-md rounded-md bg-yellow-300 text-green-800 text-xs font-bold  AddToCartButton"
                    onClick={() => {
                      if (authTokens) {
                        setQuantity(quantity + 1);
                        changeQuantity(1);
                      } else {
                        navigate("/signup");
                      }
                    }}
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
                  {Data ? Data["name"] : <Skeleton width={60} height={20} />}
                </h3>
              </div>
              <div className=" w-[100%] md:w-[50%] flex justify-center items-center flex-col AddGap laptopProduct">
                <div
                  className="w-[100%] ProductPriceDiv laptopProduct"
                  style={{ marginLeft: "5px" }}
                >
                  <span className="ProductPrice">
                    {Data ? Data["price"] : <Skeleton width={60} height={20} />}
                  </span>
                </div>
              </div>

              <div className="ProductInfo">
                <h2>Product Information</h2>
                <div className="w-[100%] flex flex-col md:flex-row justify-start">
                  <div className="w-[100%]">
                    <div className="ProductTable">
                      <div className="ProductTableRow">
                        <div className="ProductTableTd1">BRAND</div>
                        <div className="ProductTableTd2">
                          {Data ? (
                            Data["brand"]
                          ) : (
                            <Skeleton width={60} height={20} />
                          )}
                        </div>
                      </div>
                      <div className="ProductTableRow">
                        <div className="ProductTableTd1">WEIGHT</div>
                        <div className="ProductTableTd2">
                          {Data ? (
                            Data["weight"]
                          ) : (
                            <Skeleton width={60} height={20} />
                          )}
                        </div>
                      </div>
                      <div className="ProductTableRow">
                        <div className="ProductTableTd1">FLAVOUR</div>
                        <div className="ProductTableTd2">
                          {Data ? (
                            Data["flavour"]
                          ) : (
                            <Skeleton width={60} height={20} />
                          )}
                        </div>
                      </div>
                      <div className="ProductTableRow">
                        <div className="ProductTableTd1">CATEGORY</div>
                        <div className="ProductTableTd2">
                          {Data ? (
                            Data["category"]
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
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi saepe illum molestias iusto fugiat quas consectetur
                  nihil quia laborum illo officia omnis sit error voluptatem
                  autem eos facilis mollitia vero, necessitatibus amet ipsa hic
                  maxime ab! Magnam, ipsa amet? Porro cumque illo corporis
                  itaque dicta pariatur dolore, earum blanditiis nesciunt, cum
                  dignissimos quae neque labore consequatur explicabo impedit
                  laudantium recusandae numquam accusantium nihil vitae, facere
                </p>
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
                      {method === "PATCH"
                        ? "Edit The Review"
                        : "Post The Review"}
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

                  {Reviews.length > 0 ? (
                    Reviews.map((review, index) => {
                      return <UserReviews key={index} review={review} />;
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
