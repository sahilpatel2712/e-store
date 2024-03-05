import React, { useEffect, useRef, useState } from "react";
import Logo from "../aseets/images/Logo.png";
import LogoutIcon from "../aseets/icons/LogoutIcon";
import ToggleIcon from "../aseets/icons/ToggleIcon";
import CloseIcon from "../aseets/icons/CloseIcon";
import SearchIcon from "../aseets/icons/SearchIcon";
import CartIcon from "../aseets/icons/CartIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userOut } from "../redux/reducers/auth";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  // const [userDetails, setUserDetails] = useState();
  const dispatch = useDispatch();
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

  // const fetchData = async () => {
  //   await fetch("https://api-krudra9125-gmailcom.vercel.app/api/searchbarData/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);

  //       setLis(data);
  //     })
  //     .catch((err) => console.log(err));

  //   // setLis(product_data.product_data?.map((item) => { return item.name.toLowerCase() }));
  // };
  // const fetchUserDetails = async () => {
  //   await fetch("https://api-krudra9125-gmailcom.vercel.app/api/userDetails/", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${authTokens["access"]}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUserDetails(data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // React.useEffect(() => {
  //   console.log("auth tokens", authTokens);
  //   if (authTokens !== null) {
  //     fetchUserDetails();
  //   }
  // }, [authTokens]);
  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  const [activeCategory, setActiveCategory] = useState(null);
  const ToggleDiv = useRef(null);
  const searchBarDataOnChange = (e) => {
    if (e.length <= 0) {
      setShowOptions(false);
    } else {
      setShowOptions(true);
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
  const handleLogOut = () => {
    window.location.reload();
    dispatch(userOut());
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

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

  return (
    <header className="Navbar">
      <div className="UpperNav VCenter-flex">
        <div className="ToggleIconDiv VCenter-flex Mobile">
          <button className="ToggleButton VCenter-flex" onClick={ToggleOnOff}>
            {ToggleOn ? <CloseIcon /> : <ToggleIcon />}
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
              <SearchIcon />
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
              </div>
            </div>
          </div>
        </div>
        <div className="UpperLastDiv VCenter-flex">
          {auth.user ? (
            <p className="DisappearMobile">
              {false ? `Welcome,${auth.user.name}` : ""}
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
                auth.user ? "flex" : "hidden"
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
            </div>
            <div
              className="PopOverUser"
              style={popover ? { display: "block" } : { display: "none" }}
              ref={popOverDiv}
            >
              <ul>
                <li className="UserNamePopOver">
                  <p>{auth.user ? `${auth.user.name}` : ""}</p>
                </li>
                <li className="UserNamePopOver">
                  <Link to={"/forgotPassword"}>Change Password</Link>
                </li>

                <li className="PopoverLine">
                  <div onClick={handleLogOut}>
                    <LogoutIcon />
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            className=" CartDiv VCenter-flex"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <a className="CartLink VCenter-flex ">
              <p className="NavImageWrapper bg-yellow-300  rounded-2xl CartContent   w-[3rem] h-[3rem]  hover:shadow-md transition-all duration-500  ease-in-out  VCenter-flex">
                <CartIcon />
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
