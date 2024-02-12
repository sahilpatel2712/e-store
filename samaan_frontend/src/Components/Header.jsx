import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import Logo from "./Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth";

const Header = () => {
  const { authTokens, logoutUser } = React.useContext(AuthContext);

  const [userDetails, setUserDetails] = useState();
  const popOverDiv = useRef(null);
  const popOverRef = useRef(null);
  const [popover, setPopOver] = useState(false);
  const [ToggleOn, setToggleOn] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [lis, setLis] = useState([]);

  const [searchBarData, setSearchBarData] = useState(lis);
  const [clickedOnCategory, setClickedOnCategory] = useState(false);
  const [hoverOn, setHoverOn] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    await fetch("https://api-krudra9125-gmailcom.vercel.app/api/searchbarData/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setLis(data);
      })
      .catch((err) => console.log(err));

    // setLis(product_data.product_data?.map((item) => { return item.name.toLowerCase() }));
  };
  const fetchUserDetails = async () => {
    await fetch("https://api-krudra9125-gmailcom.vercel.app/api/userDetails/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authTokens["access"]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    console.log("auth tokens", authTokens);
    if (authTokens !== null) {
      fetchUserDetails();
    }
  }, [authTokens]);
  React.useEffect(() => {
    fetchData();
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);
  const ToggleDiv = useRef(null);
  const searchBarDataOnChange = (e) => {
    if (e.length <= 0) {
      setShowOptions(false);
    } else {
      setShowOptions(true);
      console.log(showOptions);
      setSearchBarData(
        lis?.filter((item) => {
          if (item.name.toLowerCase().includes(e)) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  };
  const ToggleOnOff = () => {
    if (ToggleDiv.current) {
      const currentDisplay = ToggleDiv.current.style.display;
      ToggleDiv.current.style.display =
        currentDisplay === "flex" ? "none" : "flex";
    }
    setToggleOn(!ToggleOn);
  };

  const handleCategoryHover = (index) => {
    setHoverOn(true);
    setActiveCategory(index);
  };

  const handleCategoryLeave = () => {
    setHoverOn(false);
    if (clickedOnCategory === false) {
      setActiveCategory(null);
    }
  };

  const handleSubMenuHover = (index) => {
    setHoverOn(true);
    setActiveCategory(index);
  };

  const handleWindowResize = () => {
    if (ToggleDiv.current) {
      ToggleDiv.current.style.display = "none";
      setToggleOn(false);
    }
    const windowWidth = window.innerWidth;
    ToggleDiv.current.style.display = windowWidth > 1024 ? "block" : "none";
  };

  const handleClickHeaderAnchor = (index, e) => {
    e.preventDefault();
    setActiveCategory(index);
    setClickedOnCategory(!clickedOnCategory);
  };

  const handleCategoryBlur = () => {
    setClickedOnCategory(false);
    setActiveCategory(null);
  };

  const handleBlur = () => {
    setPopOver(false);
  };

  const handlePopOver = () => {
    setPopOver(!popover);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popOverRef.current &&
        !popOverRef.current.contains(event.target) &&
        popOverDiv.current &&
        !popOverDiv.current.contains(event.target)
      ) {
        setPopOver(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  console.log(activeCategory || hoverOn);

  return (
    <header className="Navbar">
      <div className="UpperNav VCenter-flex">
        <div className="ToggleIconDiv VCenter-flex Mobile">
          <button className="ToggleButton VCenter-flex" onClick={ToggleOnOff}>
            {ToggleOn ? (
              <>
                <svg
                  height="25px"
                  width="26px"
                  id="Close"
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
                      d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                      fill="#0F0F0F"
                    ></path>
                  </g>
                </svg>
              </>
            ) : (
              <>
                <svg
                  height="25px"
                  width="26px"
                  id="Open"
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
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </>
            )}
          </button>
        </div>
        <div className="LogoDiv VCenter-flex">
          <Link to="/">
            <img src={Logo} className=" w-[22rem] " alt="" srcSet="" />
          </Link>
        </div>
        <div className="relative SearchDiv VCenter-flex Laptop">
          <div className="SearchBar ">
            <div className="SearchIcon">
              <svg
                width="20px"
                height="100%"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                sketch="http://www.bohemiancoding.com/sketch/ns"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                  type="MSPage"
                >
                  <g
                    id="Icon-Set"
                    type="MSLayerGroup"
                    transform="translate(-256.000000, -1139.000000)"
                    fill="#000000"
                  >
                    <path
                      d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                      id="search"
                      type="MSShapeGroup"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="SearchInput  w-[100%] h-[100%]  ">
              <input
                type="text"
                onFocus={() => {
                  setShowOptions(true);
                }}
                onBlur={() => {
                  setShowOptions(false);
                }}
                onChange={(e) => {
                  searchBarDataOnChange(e.target.value.toLowerCase().trim(""));
                }}
                placeholder="Search Items Here"
              />
              <div
                className={` ${
                  showOptions ? "absolute" : "hidden"
                } z-20 max-h-[12rem] overflow-scroll bg-white w-[100%] min-h-fit top-14 left-0 flex  shadow-lg  flex-col justify-start items-center  `}
              >
                {searchBarData?.map((item) => {
                  return (
                    <Link
                      onMouseDownCapture={() => {
                        navigate(`/search/${item.id}`);
                        window.location.reload();
                      }}
                      className="w-[100%] text-start  pl-7 hover:bg-yellow-300 hover:shadow-md transition-all duration-500  ease-in-out    border  "
                    >
                      {item.name.toLowerCase()}
                    </Link>
                  );
                })}
                {/* test */}
                {/* <div className= ' w-[100%] text-start  pl-7     border  ' >lorem</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="UpperLastDiv VCenter-flex">
          {userDetails ? (
            <p className="DisappearMobile">
              {authTokens ? `Welcome,${userDetails["name"]}` : ""}
            </p>
          ) : (
            <div
              className="bg-yellow-300 hover:shadow-md w-[7rem] h-[3rem]  transition-all duration-500  rounded-xl text-center flex justify-center items-center font-[700] cursor-pointer MobileStyleLoginButton"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <p>Login/signup</p>
            </div>
          )}
          <div
            style={{ height: "50%", border: " 1px solid black" }}
            className="Laptop"
          ></div>
          <div className="flex items-center justify-center ProfileDiv VCenter-flex">
            <div
              className={`NavImageWrapper Profilesvg bg-yellow-300 rounded-2xl  w-[3rem] h-[3rem]  hover:shadow-md transition-all duration-500  ease-in-out ${
                userDetails ? "flex" : "hidden"
              } justify-center items-center cursor-pointer `}
              onClick={handlePopOver}
              onBlur={handleBlur}
              ref={popOverRef}
            >
              <img
                src="./user.svg"
                className="NavImage w-[2.6rem] h-[2.6rem] active:w-[2.5rem] active:h-[2.5rem] "
                alt="d"
              />

              {/* <span className="Laptop"> Profile</span> */}
            </div>
            <div
              className="PopOverUser"
              style={popover ? { display: "block" } : { display: "none" }}
              ref={popOverDiv}
            >
              <ul>
                <li className="UserNamePopOver">
                  <p>{userDetails ? `${userDetails["name"]}` : ""}</p>
                </li>
                <li className="UserNamePopOver">
                  <Link to={"/forgotPassword"}>Change Password</Link>
                </li>

                <li className="PopoverLine">
                  <div
                    onClick={() => {
                      logoutUser();
                      window.location.reload();
                    }}
                  >
                    <svg
                      width="10px"
                      height="10px"
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
                          d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>{" "}
                        <path
                          d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                          stroke="#1C274C"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            className=" CartDiv VCenter-flex"
            onClick={() => {
              if (userDetails) {
                navigate("/cart");
              } else {
                navigate("/signup");
              }
            }}
          >
            <a className="CartLink VCenter-flex ">
              <p className="NavImageWrapper bg-yellow-300  rounded-2xl CartContent   w-[3rem] h-[3rem]  hover:shadow-md transition-all duration-500  ease-in-out  VCenter-flex">
                <svg
                  className=" laptop active:w-[27px] active:h-[27px] "
                  width="28px"
                  height="28px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="LowerNav Laptop" id="ToggleM" ref={ToggleDiv}>
        <ul className="MenuBannerUl VCenter-flex">
          <li
            className="MenuBannerLi"
            id="Third"
            onMouseEnter={() => handleCategoryHover(2)}
            onMouseLeave={handleCategoryLeave}
          >
            <a
              href=""
              className={`${
                activeCategory === 2 ? "activeCate" : ""
              } HoverEffectLink MenuBannerLink`}
              onClick={(e) => handleClickHeaderAnchor(2, e)}
              onBlur={handleCategoryBlur}
            >
              <p className="HoverEffectLinkPara MenuBannerPara">Munchies</p>
            </a>
          </li>
          <li
            className="MenuBannerLi"
            id="First"
            onMouseEnter={() => handleCategoryHover(0)}
            onMouseLeave={handleCategoryLeave}
          >
            <a
              href=""
              className={`${
                activeCategory === 0 ? "activeCate" : ""
              } HoverEffectLink MenuBannerLink`}
              onClick={(e) => handleClickHeaderAnchor(0, e)}
              onBlur={handleCategoryBlur}
            >
              <p className="HoverEffectLinkPara MenuBannerPara">
                Vegetables & Fruits
              </p>
            </a>
          </li>
          <li
            className="MenuBannerLi"
            id="Second"
            onMouseEnter={() => handleCategoryHover(1)}
            onMouseLeave={handleCategoryLeave}
          >
            <a
              href=""
              className={`${
                activeCategory === 1 ? "activeCate" : ""
              } HoverEffectLink MenuBannerLink`}
              onClick={(e) => handleClickHeaderAnchor(1, e)}
              onBlur={handleCategoryBlur}
            >
              <p className="HoverEffectLinkPara MenuBannerPara">
                Dairy & Breakfast
              </p>
            </a>
          </li>

          <li
            className="MenuBannerLi"
            id="Fourth"
            onMouseEnter={() => handleCategoryHover(3)}
            onMouseLeave={handleCategoryLeave}
          >
            <a
              href=""
              className={`${
                activeCategory === 3 ? "activeCate" : ""
              } HoverEffectLink MenuBannerLink`}
              onClick={(e) => handleClickHeaderAnchor(3, e)}
              onBlur={handleCategoryBlur}
            >
              <p className="HoverEffectLinkPara MenuBannerPara">Beverages</p>
            </a>
          </li>
          <li
            className="MenuBannerLi"
            id="Fifth"
            onMouseEnter={() => handleCategoryHover(4)}
            onMouseLeave={handleCategoryLeave}
          >
            <a
              href=""
              className={`${
                activeCategory === 4 ? "activeCate" : ""
              } HoverEffectLink MenuBannerLink`}
              onClick={(e) => handleClickHeaderAnchor(4, e)}
              onBlur={handleCategoryBlur}
            >
              <p className="HoverEffectLinkPara MenuBannerPara">
                Instant Foods
              </p>
            </a>
          </li>
          <li
            className="MenuBannerLi"
            id="Sixth"
            onMouseEnter={() => handleCategoryHover(5)}
            onMouseLeave={handleCategoryLeave}
          >
            <a
              href=""
              className={`${
                activeCategory === 5 ? "activeCate" : ""
              } HoverEffectLink MenuBannerLink`}
              onClick={(e) => handleClickHeaderAnchor(5, e)}
              onBlur={handleCategoryBlur}
            >
              <p className="HoverEffectLinkPara MenuBannerPara">Biscuits</p>
            </a>
          </li>
          <li
            className="MenuBannerLi"
            id="Seventh"
            onMouseEnter={() => handleCategoryHover(6)}
            onMouseLeave={handleCategoryLeave}
          >
            <a
              href=""
              className={`${
                activeCategory === 6 ? "activeCate" : ""
              } HoverEffectLink MenuBannerLink`}
              onClick={(e) => handleClickHeaderAnchor(6, e)}
              onBlur={handleCategoryBlur}
            >
              <p className="HoverEffectLinkPara MenuBannerPara">Sweet Tooth</p>
            </a>
          </li>
        </ul>
        <ul
          className="MenuBannerHoverDisplayUl"
          style={{ display: clickedOnCategory || hoverOn ? "block" : "none" }}
        >
          <li
            className={`Third MenuBannerDisplayLi SubMenu ${
              activeCategory === 2 ? "active" : ""
            }`}
            onMouseEnter={() => handleSubMenuHover(2)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="MenuBannerDisplayLiDiv">
              <img
                src="/Assets/category_logos/chips.webp"
                alt="test"
                srcset=""
                onClick={() => {
                  navigate("/search/44");
                  navigate(0);
                }}
              />
            </div>
          </li>
          <li
            className={`First MenuBannerDisplayLi SubMenu ${
              activeCategory === 0 ? "active" : ""
            }`}
            onMouseEnter={() => handleSubMenuHover(0)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="MenuBannerDisplayLiDiv">
              <img
                src="/Assets/category_logos/vegetables.webp"
                alt="test"
                srcset=""
              />
            </div>
          </li>
          <li
            className={`Second MenuBannerDisplayLi SubMenu ${
              activeCategory === 1 ? "active" : ""
            }`}
            onMouseEnter={() => handleSubMenuHover(1)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="MenuBannerDisplayLiDiv">
              <img
                src="/Assets/category_logos/breakfast.webp"
                alt="test"
                srcset=""
                onClick={() => {
                  navigate("/search/86");
                  navigate(0);
                }}
              />
              <img
                src="/Assets/category_logos/dairy.webp"
                alt="test"
                srcset=""
                onClick={() => {
                  navigate("/search/103");
                  navigate(0);
                }}
              />
            </div>
          </li>

          <li
            className={`Fourth MenuBannerDisplayLi SubMenu ${
              activeCategory === 3 ? "active" : ""
            }`}
            onMouseEnter={() => handleSubMenuHover(3)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="MenuBannerDisplayLiDiv">
              <img
                src="/Assets/category_logos/cold_drinks.webp"
                alt="test"
                srcset=""
              />
              <img
                src="./Assets/category_logos/hot_drinks.webp"
                alt="test"
                srcset=""
                onClick={() => {
                  navigate("/search/90");
                  navigate(0);
                }}
              />
            </div>
          </li>
          <li
            className={`Fifth MenuBannerDisplayLi SubMenu ${
              activeCategory === 4 ? "active" : ""
            }`}
            onMouseEnter={() => handleSubMenuHover(4)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="MenuBannerDisplayLiDiv">
              {" "}
              <img
                src="/Assets/category_logos/sweet tooth.webp"
                alt="test"
                srcset=""
                onClick={() => {
                  navigate("/search/156");
                  navigate(0);
                }}
              />
            </div>
          </li>
          <li
            className={`Sixth MenuBannerDisplayLi SubMenu ${
              activeCategory === 5 ? "active" : ""
            }`}
            onMouseEnter={() => handleSubMenuHover(5)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="MenuBannerDisplayLiDiv">
              {" "}
              <img
                src="/Assets/category_logos/sweet tooth.webp"
                alt="test"
                srcset=""
                onClick={() => {
                  navigate("/search/156");
                  navigate(0);
                }}
              />
            </div>
          </li>
          <li
            className={`Seventh MenuBannerDisplayLi SubMenu ${
              activeCategory === 6 ? "active" : ""
            }`}
            onMouseEnter={() => handleSubMenuHover(6)}
            onMouseLeave={handleCategoryLeave}
          >
            <div className="MenuBannerDisplayLiDiv">
              <img
                src="/Assets/category_logos/sweet tooth.webp"
                alt="test"
                srcset=""
                onClick={() => {
                  navigate("/search/156");
                  navigate(0);
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
