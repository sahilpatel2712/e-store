import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-center items-center">
      <div className="w-[100%] h-[100%] max-w-screen-2xl max-h-[800px] flex justify-center items-center  ">
        <div className=" hidden md:flex md:w-[50%] h-[100%]   justify-center items-center ">
          <img
            className=" h-[80%] w-[80%] object-contain "
            src="/login_left.svg"
            alt=""
            srcset=""
          />
        </div>
        <div className=" w-[100%] md:w-[50%] h-[100%] flex justify-center items-center flex-col">
          <div className="w-[100%] h-[100%] flex flex-col rounded-2xl justify-around items-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
