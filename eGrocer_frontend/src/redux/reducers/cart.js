import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const cartReducer = createSlice({
  name: "carts",
  initialState: {
    cartData: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload;
    },
  },
});

const { setCart } = cartReducer.actions;

export const getUserCartData = (userId) => {
  return async (dispatch, getState) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/cart/${userId}`
      );
      dispatch(setCart(response.data));
    } catch (error) {
      console.log(error);
    }
  };  
};

export const addOrUpdateUserCart = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart/add`,
        {
          data,
        }
      );
      dispatch(setCart(response.data?.carts));
      toast.success(response.data?.responseMessage, {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.response.data?.error, {
        position: "top-right",
      });
    }
  };
};

export default cartReducer.reducer;
