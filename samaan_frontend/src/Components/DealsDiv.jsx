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

  // const [data, setData] = React.useState();

  // const { authTokens } = React.useContext(AuthContext);
  // const fetchData = async () => {
  //   if (authTokens) {
  //     console.log("category with auth token");
  //     await fetch(
  //       `https://api-krudra9125-gmailcom.vercel.app/api/products/${category}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${authTokens["access"]}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setData(data);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     await fetch(
  //       `https://api-krudra9125-gmailcom.vercel.app/api/products/${category}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setData(data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  // React.useLayoutEffect(() => {
  //   fetchData();
  // }, []);

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
      pagination={{ clickable: true }}
      breakpoints={breakpoints}
      rewind={false}
      slidesPerView={6}
      autoplay={true}
      navigation={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={setSwiper}
    >
      {productsData?.length > 0
        ? productsData?.map((item, id) => {
            return (
              <SwiperSlide key={id}>
                <ProductCardTwo
                  key={id}
                  name={item.name}
                  price={item.price}
                  imgSrc={item.img_path}
                  weight={item.weight}
                  category={item.category}
                  productId={item.id}
                  cartQuantity={item.quantity}
                />
              </SwiperSlide>
            );
          })
        : [1, 1, 1, 1, 1, 1, 1, 1].map((item, id) => {
            return (
              <SwiperSlide
                key={id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* <SkeletonCardTwo /> */}
                <ProductCardTwo
                  key={id}
                  name={item.name}
                  price={item.price}
                  imgSrc={item.img_path}
                  weight={item.weight}
                  category={category}
                  productId={item.id}
                  cartQuantity={item.quantity}
                />
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};
export default DealsDiv;
