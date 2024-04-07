import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products`
      );
      dispatch(setProduct(response.data));
    } catch (error) {
      toast.error(error.response.data?.error, {
        position: "top-right",
      });
    }
  };
};

export const updateProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/update/${data.productId}`,
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
      toast.error(error.response.data?.error, {
        position: "top-right",
      });
    }
  };
};

export default productReducer.reducer;
