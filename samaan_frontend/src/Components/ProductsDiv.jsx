import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import DealsDiv from "./DealsDiv.jsx";

const ProductsDiv = ({ title, Category }) => {
  return (
    <div className=" w-[100%] min-h-[30rem]  flex justify-center items-center ">
      <div
        id="products"
        className="  w-[100%]   flex flex-col gap-8  justify-between items-start   "
      >
        <div className="w-[100%] h-[20%] flex justify-between px-2   flex-row-reverse  md:px-8 items-center ">
          <div>
            <span className=" text-xl md:text-5xl  font-[900] drop-shadow-xl    ">
              {title}
            </span>
          </div>
          <div>
            <button className="bg-yellow-300 text-black   md:w-[auto]  flex rounded-xl shadow-lg md:text-2xl  items-center py-2 px-2 font-bold  text-center  ">
              <span>see all</span>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div className="w-[100%] h-[80%] flex justify-between gap-8 items-center  ">
          <DealsDiv category={Category} />
        </div>
      </div>
    </div>
  );
};

export default ProductsDiv;
