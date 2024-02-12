import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/Auth";
import "./DetailsMain.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletOnPrice } from "./Skeletons/Skeletons";
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import UserReviews from "./UserReviews";
const DetailsMain = () => {
  const { id } = useParams();
  const [method,setMethod] = React.useState("POST")
  const { authTokens } = React.useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [PinCode, setPinCode] = useState("400020");
  const [EditState, setEditState] = useState(false);
  const [Data, setData] = React.useState();
  const [quantity, setQuantity] = React.useState(0);
  const [AddReviewState,setAddReviewState] = React.useState(false)
  const [ReviewText,setReviewText] = React.useState()
  const [Reviews,setReviews] = React.useState([])
  const [averageReview,setAverageReview] = React.useState(0)
  const navigate = useNavigate();
  const changeQuantity = async (q) => {
    if (authTokens && Data) {
      const response = await fetch(
        "https://api-krudra9125-gmailcom.vercel.app/api/cart/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens["access"]}`,
          },
          body: JSON.stringify({ product: Data["id"], quantity: q }),
        }
      );
      const data = await response.json();
      console.log(data);
    }
  };
  const handleEditState = () => {
    setEditState(!EditState);
  };

  const handlePincodeChange = (e) => {
    setPinCode(e.target.value);
  };
  
  const getReviews=async()=>{
    if (id){
    const response =await fetch(`https://api-krudra9125-gmailcom.vercel.app/api/review/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data=await response.json()
    setReviews(data)
    console.log("reviews",data)
    let sum=0
    if (data.length>0){
    data.map((review)=>{
      sum+=review.rating
      
    })
    setAverageReview(sum/data.length)
  }
  }
  
  }

  const fetchData = async () => {
    if (authTokens) {
      await fetch(
        `https://api-krudra9125-gmailcom.vercel.app/api/product/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens["access"]}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
          setQuantity(data["quantity"]);
        })
        .catch((err) => console.log(err));
    } else {
      await fetch(
        `https://api-krudra9125-gmailcom.vercel.app/api/product/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
          setQuantity(data["quantity"]);
        })
        .catch((err) => console.log(err));
    }
  };


  const handleAddReview = async(e) => {
    e.preventDefault();
    if(authTokens)
    {
    if(rating>0)
    {
      const userId=jwtDecode(authTokens["access"])["user_id"]
      const response=await fetch(`https://api-krudra9125-gmailcom.vercel.app/api/review/${id}`,{
        method:method,
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens["access"]}`,
        },
        body:JSON.stringify({"rating":rating,"comment":ReviewText,"user":userId})
      })
      const data= await response.json()
   
      if(data["message"]==='review added successfully')
      {
        alert("review added successfully")
        getReviews()
        getUserReviewStatus()
      }
    else if(data["message"]==='review updated successfully'){
      alert("review updated successfully")
        getReviews()
        getUserReviewStatus()
        
        
    }
    else
    {
      alert("something went wrong")
    }
    }
    else{
      alert("please give rating")
    }
  }
    else{
      navigate("/signup")
    }
   
    setAddReviewState(!AddReviewState)
  }
  const getUserReviewStatus=async()=>{
    if(authTokens){
      const userId=jwtDecode(authTokens["access"])["user_id"]
      const response=await fetch(`https://api-krudra9125-gmailcom.vercel.app/api/review/${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${authTokens["access"]}`,
        },
      })
      const data=await response.json()
      if(data["message"]==='no reviews')
      {
        console.log("no reviews")
        setMethod("POST")
        setRating(0)
        setReviewText("")
        
      }
      else{
        setMethod("PATCH")
        setRating(data["rating"])
        setReviewText(data["comment"])
      }
    }}
  
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
    getReviews()
    getUserReviewStatus()
  }, [id]);
  


  return (
    <div>
      <div className="w-[100%] h-[100%] outer">
        <div className="w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-col justify-start items-center min-h-fit  ">
          <div className="DetailsOuter Vflex AroundFlex">
            <div className="ImageWrapperDiv">
              <div
                className="ProductNameHeader mobileProduct"
                style={{ padding: "10px 10px" }}
              >
                <h3>{Data ? Data["name"] : ""}</h3>
              </div>
              <div
                className=" w-[100%] md:w-[50%] flex justify-center items-center flex-col AddGap"
                style={{ padding: "5px 10px" }}
              >
                <div
                  className="w-[100%] ProductPriceDiv mobileProduct"
                  style={{ marginLeft: "5px" }}
                >
                  <span className="ProductPrice">
                    {Data?.price ? Data["price"] : <SkeletOnPrice />}
                  </span>
                </div>
              </div>
              {Data ? (
                <div className="DetailsImageDiv">
                  <div className="DetailsImageOuter">
                    <div className="ImageWrap">
                      {console.log("this is data", Data)}
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

              {/* <div className="DeliverDiv">
                <h1 className="DeliverHeader">Deliver to</h1>
                <div
                  className="DeliverPinCode"
                  style={EditState ? { display: "flex" } : { display: "none" }}
                >
                  <input
                    type="text"
                    onChange={handlePincodeChange}
                    value={PinCode}
                  />
                  <div className="IconOk" onClick={handleEditState}>
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
                  </div>
                </div>
                <div
                  className="InputIcon"
                  style={EditState ? { display: "none" } : { display: "flex" }}
                >
                  {PinCode}
                  <div className="EditIcon" onClick={handleEditState}>
                    <svg
                      width="20px"
                      height="20px"
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
                        {" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
                          fill="#080341"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
              </div> */}

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
                  <h1 className="H1Ratings CustomerHeader">Ratings & Reviews</h1>
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
                    <div className="InputReview" >
                      <textarea name="" id="" cols="30" rows="5" value={ReviewText} onChange={(e)=>setReviewText(e.target.value)}></textarea>
                    </div>
                    <button className="WriteReviewButton" onClick={handleAddReview}>
                     {method==="PATCH"?"Edit The Review":"Post The Review"}
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
                  
                {Reviews.length>0 ? Reviews.map((review,index)=>{
                  return <UserReviews key={index} review={review}/>
                }):<h1>No Reviews Available</h1>}
            
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsMain;
