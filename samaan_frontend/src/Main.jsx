import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import "./App.css";
import "./loader.css";

import Footer from "./Components/Footer";

function Main() {
  return (
    <div className="w-[100%] max-w-screen-2xl mx-auto flex flex-col justify-start items-center min-h-fit   ">
      <div className=" w-[100%]  md:min-h-[8rem] top-0 fixed  z-10 ">
        <Header />
      </div>
      <div className="w-[100%]  ">
        <main>
          <Outlet />
        </main>
        <div className=" w-[100%] min-h-[15rem]   ">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Main;


