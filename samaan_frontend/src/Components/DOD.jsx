import React from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import AuthContext from "../context/Auth";
const DOD = () => {
  const [swiper, setSwiper] = React.useState(null);
  // const { authTokens } = React.useContext(AuthContext);
  // const product_data = React.useContext(productDetails);
  const [data, setData] = React.useState();

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 6,
    },
  };

  return (
    <Swiper
      pagination={{ clickable: true }}
      rewind={false}
      breakpoints={breakpoints}
      slidesPerView={6}
      autoplay={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={setSwiper}
    >
      {data?.map((item, id) => {
        return (
          <SwiperSlide key={id} className="flex justify-center ">
            <ProductCard
              key={id}
              name={item.name}
              price={item.price}
              imgSrc={item.img_path}
              weight={item.weight}
              category={item.category}
              className="mx-auto "
              productId={item.id}
              cartQuantity={item.quantity}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default DOD;
