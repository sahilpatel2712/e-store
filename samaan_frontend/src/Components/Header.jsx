import React, { useEffect, useRef, useState } from "react";
import Logo from "../aseets/images/Logo.png";
import LogoutIcon from "../aseets/icons/LogoutIcon";
import ToggleIcon from "../aseets/icons/ToggleIcon";
import CloseIcon from "../aseets/icons/CloseIcon";
import UserIcon from "../aseets/images/user.svg";
import SearchIcon from "../aseets/icons/SearchIcon";
import CartIcon from "../aseets/icons/CartIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userOut } from "../redux/reducers/auth";
import BuyIcon from "../aseets/icons/BuyIcon";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { productsData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const popOverDiv = useRef(null);
  const popOverRef = useRef(null);
  const [popover, setPopOver] = useState(false);
  const [ToggleOn, setToggleOn] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { categoriesData } = useSelector((state) => state.categories);
  const [searchBarData, setSearchBarData] = useState([]);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const ToggleDiv = useRef(null);

  const searchBarDataOnChange = (e) => {
    if (e.length <= 0) {
      setShowOptions(false);
    } else {
      setShowOptions(true);
      setSearchBarData(
        productsData?.filter((product) => {
          if (product.productName.toLowerCase().includes(e)) {
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

  const handleWindowResize = () => {
    if (ToggleDiv.current) {
      ToggleDiv.current.style.display = "none";
      setToggleOn(false);
    }
    const windowWidth = window.innerWidth;
    ToggleDiv.current.style.display = windowWidth > 1024 ? "block" : "none";
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
                        navigate(`/search/${item.productId}`);
                        window.location.reload();
                      }}
                      className="w-[100%] text-start  pl-7 hover:bg-yellow-300 hover:shadow-md transition-all duration-500  ease-in-out    border  "
                    >
                      {item?.productName.toLowerCase()}
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
                src={UserIcon}
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
                  <p className="m-0" >{auth.user ? `${auth.user.name}` : ""}</p>
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
          <div
            className=" CartDiv VCenter-flex"
            onClick={() => {
              navigate("/orders");
            }}
          >
            <a className="CartLink VCenter-flex ">
              <p className="NavImageWrapper bg-yellow-300  rounded-2xl CartContent   w-[3rem] h-[3rem]  hover:shadow-md transition-all duration-500  ease-in-out  VCenter-flex">
                <BuyIcon/>
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="LowerNav Laptop" id="ToggleM" ref={ToggleDiv}>
        <ul className="MenuBannerUl VCenter-flex">
          {categoriesData?.map((item, index) => {
            if (index < 7) {
              return (
                <li className="MenuBannerLi" id="Third" key={index}>
                  <Link
                    className={`${
                      activeCategory === 2 ? "activeCate" : ""
                    } HoverEffectLink MenuBannerLink`}
                  >
                    <p className="HoverEffectLinkPara MenuBannerPara">
                      {item.categoryName}
                    </p>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </header>
  );
};
export default Header;
