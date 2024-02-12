import React, { useEffect, useState } from "react";
import "./OnSearch.css";
import OnSearchLeft from "./OnSearchLeft";
import OnSearchRight from "./OnSearchRight";
import { useParams } from "react-router-dom";

const OnSearch = () => {
  const { id } = useParams();
  const mySet = new Set();
  const [productData, setProductData] = useState(null);
  const [brandsData, setBrandsData] = useState(null);
  const [brandDataFilter, setBrandDataFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(productData);

  const fetchData = async () => {
    await fetch(
      `https://api-krudra9125-gmailcom.vercel.app/api/searchbarRequestedData/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductData(data);
        setFilteredData(data);
        data.map((item) => {
          mySet.add(item.brand.toUpperCase());
          return null;
        });
        setBrandsData(Array.from(mySet));
        console.log(mySet);
        console.log(brandsData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  useEffect(() => {
    if (brandDataFilter !== null) {
      setFilteredData(
        productData.filter((item) => item.brand === brandDataFilter)
      );
    }
  }, [brandDataFilter]);

  return (
    <div>
      <div className="w-[100%] h-[100%] mt-[8rem]   ">
        <div className="w-[100%] h-[100%] max-w-screen-2xl mx-auto flex flex-col justify-start items-center min-h-fit  ">
          <div className="OnSearchOuter Vflex AroundFlex">
            <div className="OnSearchInnerLeft">
              <OnSearchLeft
                data={brandsData}
                filterFunction={setBrandDataFilter}
              />
            </div>
            <div className="OnSearchInnerRight">
              <OnSearchRight data={filteredData} />
              {/* {console.log("filteredData",filteredData)} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnSearch;
