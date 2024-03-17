import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productReducer = createSlice({
  name: "products",
  initialState: {
    productsData: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.productsData = action.payload;
    },
  },
});

const { setProduct } = productReducer.actions;

export const getProduct = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(process.env.REACT_APP_GET_PRODUCTS);
      dispatch(setProduct(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_GET_PRODUCT_UPDATE}${data.productId}`,
        { data }
      );
      let state = getState();
      let productIndex;
      const newProductList = [...state.products.productsData];
      newProductList.find((value, index) => {
        if (value.id === data.id) {
          productIndex = index;
          return value;
        }
      });
      newProductList[productIndex] = data;
      dispatch(setProduct(newProductList));
    } catch (error) {
      console.log(error);
    }
  };
};

export default productReducer.reducer;
