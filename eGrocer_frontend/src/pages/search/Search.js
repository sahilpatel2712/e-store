import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import OnSearchRight from "../../Components/OnSearchRight";
import { useSelector } from "react-redux";

const Search = () => {
  const { id } = useParams();
  const { productsData } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    let filterData = productsData.filter(
      (product) => product.productId === Number(id)
    );
    if (productsData.length !== 0) {
      if (filterData.length !== 0) {
        setData(filterData);
      } else {
        navigate("*");
      }
    }
  }, [productsData, id]);

  return (
    <div>
      <div className="w-[100%] h-[100%] mt-[8rem]   ">
        <div className="w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-col justify-start items-center min-h-fit  ">
          <div className="OnSearchOuter Vflex AroundFlex">
            <div className="OnSearchInnerRight">
              <OnSearchRight data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
