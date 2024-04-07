import React from "react";
import ProductCardTwo from "./ProductCardTwo";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SkeletonCardTwo } from "./Skeletons";
import { useSelector } from "react-redux";

const DealsDiv = ({ category, categoryId }) => {
  const [swiper, setSwiper] = React.useState(null);
  const { productsData } = useSelector((state) => state.products);

  const breakpoints = {
    320: {
      slidesPerView: 1,
    },

    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    640: {
      slidesPerView: 3,
      spaceBetween: 30,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },

    1024: {
      slidesPerView: 6,
    },
  };

  return (
    <Swiper
      style={{ width: "100%" }}
      pagination={{ clickable: true }}
      breakpoints={breakpoints}
      rewind={false}
      slidesPerView={productsData.length < 6 ? productsData.length : 5}
      autoplay={true}
      navigation={true}
      onSwiper={setSwiper}
    >
      {productsData?.length > 0
        ? productsData?.map((item) => {
            if (item.categoryId === categoryId) {
              return (
                <SwiperSlide key={item.productId}>
                  <ProductCardTwo
                    key={item.productId}
                    name={item.productName}
                    price={item.productPrice}
                    imgSrc={item.productImage}
                    weight={item.productWeight}
                    category={category}
                    categoryId={categoryId}
                    productId={item.productId}
                    quantity={item.productQuantity}
                  />
                </SwiperSlide>
              );
            }
          })
        : [1, 1, 1, 1, 1, 1, 1, 1].map((item, id) => {
            return (
              <SwiperSlide
                key={id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <SkeletonCardTwo />
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};
export default DealsDiv;
