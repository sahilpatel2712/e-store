import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonCardTwo = () => {
  return (
    <div className="Card shadow-lg  ">
      <div className="ImageContainerSkeleton">
        <Skeleton className="w-[100%] h-[100%]" />
      </div>
      <div className="contentOuter">
        <div className="Timer">
          <div className="SvgTimerIcon"></div>
          {/* <div className="TimerText">20 MINS</div> */}
        </div>
        <div className="Desc">
          <div className="Title">
            <Skeleton width={130} className="mb-[6px]" />
          </div>
          <Skeleton width={40} height={20} />
          <div className="price">
            <Skeleton width={30} height={20} />
            <Skeleton width={66} rounded={10} height={31} />
          </div>
        </div>
      </div>
    </div>
  );
};
const SkeletonCart = () => {
  return (
    <div className="CartCardOuter">
      <div className="CartCardWrapper">
        <div
          className="ImageCart"
          style={{ display: "block", padding: "0px 0px" }}
        >
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="CartDetails">
          <div className="ProductNameCart" style={{ display: "block" }}>
            <h3>
              <Skeleton width="100%" height="100%" />
            </h3>
          </div>
          <div className="PriceCart" style={{ display: "block" }}>
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="QuantityCart">
            <Skeleton width={80} height={20} />
            <div className="EditQuantity"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const SkeletOnPrice = () => {
  return <Skeleton width={40} height={20} />;
};
const SkeletOnImage = () => {
  return <Skeleton width={150} height={150} />;
};

export { SkeletonCardTwo, SkeletonCart, SkeletOnPrice, SkeletOnImage };
