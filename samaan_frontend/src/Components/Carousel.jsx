import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import I1 from "../aseets/images/CarouselImages/image1.png";
import I2 from "../aseets/images/CarouselImages/image2.png";
import I3 from "../aseets/images/CarouselImages/image3.png";
import I4 from "../aseets/images/CarouselImages/image4.png";
import I5 from "../aseets/images/CarouselImages/image5.png";

import "@splidejs/react-splide/css";

const Carousel = () => {
  const images = [I1, I2, I3, I4, I5];
  const linkSa = ["1", "2", "3", "4", "5"];

  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    width: "100%",
    height: "100%",
  };

  return (
    <div className="CarouselWrapper  w-[100%] md:h-[28rem]  overflow-hidden   ">
      <Splide
        options={options}
        className="w-[100%]  flex justify-center items-center  "
        aria-label="My Favorite Images"
      >
        {images.map((image, index) => {
          return (
            <SplideSlide>
              <a href="#">
                <img src={image} alt="" className="CarouselImage" />
              </a>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default Carousel;
