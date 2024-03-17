import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        `${process.env.REACT_APP_USER_CART_DATA}${userId}`
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
      let response = await axios.post(process.env.REACT_APP_USER_CART_ADD, {
        data,
      });
      getUserCartData(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };
};

export default cartReducer.reducer;
