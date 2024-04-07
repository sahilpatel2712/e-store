import React, { useState } from "react";
import Logo from "../aseets/images/Logo.png";
import TwitterIcon from "../aseets/icons/TwitterIcon";
import FaceBookIcon from "../aseets/icons/FaceBookIcon";
import InstaIcon from "../aseets/icons/InstaIcon";

const Footer = () => {
  const [Email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="FooterDiv">
      <div className="FooterUpperDiv">
        <div className="FooterUlDiv">
          <ul className="FooterUl">
            <li className="FooterUlHeader">Categories</li>
            <li className="FooterUlLi">
              <a href="">Snacks </a>
            </li>
            <li className="FooterUlLi">
              <a href="">Beauty care</a>
            </li>
            <li className="FooterUlLi">
              <a href="">Baby care</a>
            </li>
          </ul>
          <ul className="FooterUl">
            <li className="FooterUlHeader">Information</li>
            <li className="FooterUlLi">
              <a href="">FaQ</a>
            </li>
            <li className="FooterUlLi">
              <a href="">Blog</a>
            </li>
            <li className="FooterUlLi">
              <a href="">Support</a>
            </li>
          </ul>
          <ul className="FooterUl">
            <li className="FooterUlHeader">Company</li>
            <li className="FooterUlLi">
              <a href="">AboutUs</a>
            </li>
            <li className="FooterUlLi">
              <a href="">Careers</a>
            </li>
            <li className="FooterUlLi">
              <a href="">ContactUs</a>
            </li>
          </ul>
        </div>
        {/* <div className="FooterSubscribeDiv">
          <form action="" className="FooterSubscribeForm">
            <h3 className="FooterSubscribeHeader">Subscribe</h3>
            <div className="FooterSubscribeInputDiv">
              <input
                type="email"
                placeholder="Enter Email"
                value={Email}
                onChange={handleEmailChange}
              />
            </div>
            <button className="FooterSubscribeButton">Subscribe Now</button>
          </form>
        </div> */}
      </div>
      <hr />
      <div className="FooterLowerDiv">
        <div className="FooterLogo">
          <img src={Logo} alt="" srcSet="" />
        </div>
        <div className="LowerFooterMiddle"></div>
        <div className="FooterSocial">
          <div className="SocialIconFooter">
            <TwitterIcon />
          </div>
          <div className="SocialIconFooter">
            <InstaIcon />
          </div>
          <div className="SocialIconFooter">
            <FaceBookIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
