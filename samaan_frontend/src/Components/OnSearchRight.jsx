import React from "react";
import "./OnSearchRight.css";
import ProductCardTwo from "./ProductCardTwo";
import { SkeletonCardTwo } from "./Skeletons/Skeletons";

const OnSearchRight = ({ data }) => {
  return (
    <div>
      <div className="RightOuter">
        <div className="ProductsDiv">
          {data ?
            data.map((item, id) => {
              return (
                <ProductCardTwo
                  key={id}
                  name={item.name}
                  price={item.price}
                  imgSrc={item.img_path}
                  weight={item.weight}
                  category={item.category}
                  productId={item.id}
                />
              );
            }):
            [1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1].map((item, id) => {
              return (
                  <SkeletonCardTwo />
                  
              );
            })
            }
        </div>
      </div>
    </div>
  );
};

export default OnSearchRight;
