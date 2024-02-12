import React, { useState } from 'react'
import './Footer.css'
import Logo from './Logo.png'
const Footer = () => {
  const [Email,setEmail] = useState('')

  const handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  return (
    <div className='FooterDiv'>
      <div className="FooterUpperDiv">
        <div className="FooterUlDiv">
          <ul className="FooterUl">
            <li className='FooterUlHeader'>Categories</li>
            <li className='FooterUlLi'><a href="">Snacks </a></li>
            <li className='FooterUlLi'><a href="">Beauty care</a></li>
            <li className='FooterUlLi'><a href="">Baby care</a></li>
          </ul>
          <ul className="FooterUl">
            <li className='FooterUlHeader'>Information</li>
            <li className='FooterUlLi'><a href="">FaQ</a></li>
            <li className='FooterUlLi'><a href="">Blog</a></li>
            <li className='FooterUlLi'><a href="">Support</a></li>
          </ul>
          <ul className="FooterUl">
            <li className='FooterUlHeader'>Company</li>
            <li className='FooterUlLi'><a href="">AboutUs</a></li>
            <li className='FooterUlLi'><a href="">Careers</a></li>
            <li className='FooterUlLi'><a href="">ContactUs</a></li>
          </ul>
        </div>
        <div className="FooterSubscribeDiv">
          <form action="" className='FooterSubscribeForm'>
            <h3 className='FooterSubscribeHeader'>Subscribe</h3>
            <div className="FooterSubscribeInputDiv">
              <input type="email" placeholder='Enter Email' value={Email} onChange={handleEmailChange} />

            </div>
            <button className='FooterSubscribeButton'>
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
      <hr />
      <div className="FooterLowerDiv">
        <div className="FooterLogo">
          <img src={Logo} alt="" srcSet="" />
        </div>
        <div className="LowerFooterMiddle"></div>
        <div className="FooterSocial">
          <div className="SocialIconFooter">
            <svg fill="#000000" viewBox="0 0 32 32" height='20px' width='20px' version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.387 4.959c1.652 0 3.144 0.676 4.195 1.762 1.308-0.253 2.54-0.714 3.648-1.352-0.428 1.301-1.34 2.393-2.525 3.083 1.16-0.136 2.27-0.434 3.301-0.88-0.773 1.117-1.745 2.1-2.868 2.886 0.011 0.239 0.017 0.479 0.017 0.719 0 7.366-5.782 15.863-16.354 15.863-3.245 0-6.268-0.926-8.809-2.507 0.449 0.052 0.906 0.079 1.37 0.079 2.692 0 5.172-0.89 7.139-2.387-2.517-0.043-4.641-1.657-5.369-3.87 0.351 0.066 0.711 0.101 1.082 0.101 0.522 0 1.032-0.067 1.512-0.195-2.629-0.511-4.611-2.764-4.611-5.467v-0.072c0.776 0.418 1.661 0.669 2.605 0.698-1.543-1.001-2.558-2.705-2.558-4.64 0-1.022 0.284-1.981 0.779-2.801 2.834 3.371 7.069 5.591 11.847 5.824-0.098-0.407-0.149-0.837-0.149-1.27 0-3.079 2.574-5.575 5.749-5.575zM30.006 7.572v0zM21.387 2.959c-3.927 0-7.18 2.869-7.681 6.576-3.213-0.646-6.135-2.346-8.235-4.842-0.381-0.454-0.942-0.713-1.531-0.713-0.052 0-0.104 0.002-0.157 0.006-0.643 0.052-1.223 0.41-1.556 0.962-0.698 1.157-1.066 2.482-1.066 3.833 0 0.902 0.162 1.779 0.469 2.601-0.327 0.364-0.515 0.839-0.515 1.341v0.072c0 1.959 0.774 3.777 2.061 5.139-0.074 0.343-0.058 0.702 0.055 1.046 0.444 1.349 1.251 2.512 2.298 3.398-0.703 0.157-1.428 0.235-2.169 0.235-0.392 0-0.773-0.021-1.133-0.066-0.080-0.010-0.159-0.014-0.238-0.014-0.84 0-1.603 0.529-1.885 1.337-0.31 0.885 0.034 1.866 0.83 2.361 2.954 1.838 6.366 2.808 9.866 2.808 11.376 0 18.219-8.905 18.352-17.605 0.931-0.771 1.754-1.662 2.451-2.661 0.254-0.334 0.405-0.751 0.405-1.203 0-0.681-0.34-1.282-0.859-1.644 0.224-0.769-0.032-1.603-0.657-2.111-0.365-0.297-0.813-0.448-1.262-0.448-0.344 0-0.689 0.088-0.999 0.268-0.661 0.381-1.368 0.683-2.113 0.9-1.347-1.014-3.017-1.578-4.732-1.578z"></path> </g></svg>
          </div>
          <div className="SocialIconFooter">
            <svg fill="#000000" viewBox="0 0 32 32" height='20px' width='20px' version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.5 1.992l-0 6.996h7.010v2.999h-6.979l-0.010 8.704c0 1.618 0.084 2.657 0.255 3.117 0.267 0.727 1.236 1.657 3.037 1.657 1.396 0 3.281-0.42 4.692-1.477v4.666c-1.177 0.561-2.273 0.788-3.227 1.014s-1.989 0.339-3.098 0.339c-1.236 0-4.802-0.034-6.265-3.762-0.264-0.671-0.395-1.645-0.395-2.921v-11.332h-4.027l0.019-3.066c1.333 0 5.332-0.809 5.332-6.934zM16.5-0.008l-3.655-0c-1.104 0-2 0.895-2 2 0 4.578-2.551 4.934-3.332 4.934-1.101 0-1.995 0.889-2 1.99l-0.019 3.066c-0.003 0.532 0.207 1.043 0.582 1.421 0.376 0.377 0.885 0.589 1.418 0.589h2.027v9.332c0 1.543 0.175 2.739 0.534 3.652 0.902 2.295 3.043 5.032 8.127 5.032 1.259 0 2.456-0.132 3.558-0.392l0.221-0.052c0.933-0.22 2.126-0.493 3.407-1.104 0.697-0.332 1.139-1.034 1.139-1.805v-4.666c0-0.757-0.427-1.449-1.105-1.788-0.283-0.142-0.59-0.212-0.895-0.212-0.424 0-0.846 0.135-1.198 0.398-1.191 0.892-2.714 1.078-3.494 1.078-0.8 0-1.097-0.29-1.163-0.367-0.034-0.157-0.129-0.743-0.129-2.407l0.007-6.704h4.982c1.105 0 2-0.896 2-2v-2.999c0-1.104-0.895-2-2-2h-5.010v-4.997c0-1.105-0.895-2-2-2v0z"></path> </g></svg>
          </div>
          <div className="SocialIconFooter">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 14.906 32" height='20px' width="20px"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.874,11.167 L14.262,14.207 C14.062,15.208 13.100,15.992 12.072,15.992 L10.000,15.992 L10.000,30.000 C10.000,31.104 9.159,32.000 8.049,32.000 L5.030,32.000 C3.920,32.000 3.017,31.102 3.017,29.999 L3.017,15.992 L2.011,15.992 C0.901,15.992 -0.002,15.095 -0.002,13.991 L-0.002,10.990 C-0.002,9.887 0.901,8.989 2.011,8.989 L3.017,8.989 L3.017,6.003 C3.017,2.716 5.693,0.041 8.994,0.013 C9.015,0.012 9.033,0.001 9.055,0.001 L13.081,0.001 C13.636,0.001 14.000,0.448 14.000,1.000 L14.000,6.000 C14.000,6.553 13.636,7.004 13.081,7.004 L10.061,7.004 L10.060,8.989 L13.079,8.989 C13.645,8.989 14.167,9.228 14.509,9.644 C14.852,10.059 14.985,10.615 14.874,11.167 ZM9.092,10.990 C9.078,10.991 9.067,10.998 9.053,10.998 L9.053,10.998 C8.497,10.997 8.046,10.549 8.047,9.997 L8.047,9.990 C8.047,9.990 8.047,9.990 8.047,9.990 C8.047,9.990 8.047,9.990 8.047,9.990 L8.049,6.003 C8.049,5.450 8.499,5.003 9.055,5.003 L12.074,5.003 L12.074,2.002 L9.094,2.002 C9.077,2.002 9.063,2.011 9.045,2.011 C6.831,2.011 5.030,3.802 5.030,6.003 L5.030,10.005 C5.030,10.558 4.579,11.006 4.023,11.006 C3.996,11.006 3.973,10.992 3.946,10.990 L2.011,10.990 L2.011,13.991 L4.023,13.991 C4.579,13.991 5.030,14.439 5.030,14.992 C5.030,15.044 5.008,15.088 5.000,15.138 L5.000,30.000 L8.049,29.999 L8.049,15.002 C8.049,14.998 8.047,14.995 8.047,14.992 C8.047,14.439 8.497,13.991 9.053,13.991 L12.072,13.991 C12.145,13.991 12.275,13.886 12.288,13.816 L12.857,10.990 L9.092,10.990 Z"></path> </g></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
