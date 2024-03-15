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
    let response = await axios.get("http://127.0.0.1:5000/api/v1/products");
    dispatch(setProduct(response.data));
  };
};

export const updateProduct = (data) => {
  return async (dispatch, getState) => {
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
  };
};

export default productReducer.reducer;
