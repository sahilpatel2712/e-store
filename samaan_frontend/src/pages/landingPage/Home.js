import React from "react";
import Carousel from "../../Components/Carousel";
import ProductsDiv from "../../Components/ProductsDiv";

import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const Home = () => {
  const { categoriesData } = useSelector((state) => state.categories);
  // const [product_data, setProductData] = React.useState(null);
  // useLayoutEffect(() => {
  //   const fetchData = async () => {
  //     await fetch("https://api-krudra9125-gmailcom.vercel.app/api/products/")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setProductData(data);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   // fetchData();
  // }, []);
  return (
    <div className="w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-col justify-start items-center mt-[8rem]  overflow-scroll  ">
      <div className=" w-[100%]    ">
        <Carousel />
      </div>

      {categoriesData.map((item) => (
        <ProductsDiv
          key={item.categoryId}
          Category={item.categoryName}
          categoryId={item.categoryId}
        />
      ))}
    </div>
  );
};

export default Home;
