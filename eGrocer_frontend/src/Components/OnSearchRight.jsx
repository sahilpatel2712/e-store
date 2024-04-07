import React from "react";
import ProductCardTwo from "./ProductCardTwo";
import { SkeletonCardTwo } from "./Skeletons";

const OnSearchRight = ({ data }) => {
  return (
    <div>
      <div className="RightOuter">
        <div className="ProductsDiv">
          {data.length !== 0
            ? data.map((item, id) => {
                return (
                  <ProductCardTwo
                    key={item.productId}
                    name={item.productName}
                    price={item.productPrice}
                    imgSrc={item.productImage}
                    weight={item.productWeight}
                    productId={item.productId}
                  />
                );
              })
            : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, id) => {
                return <SkeletonCardTwo />;
              })}
        </div>
      </div>
    </div>
  );
};

export default OnSearchRight;
