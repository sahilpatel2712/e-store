import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const orderReducer = createSlice({
  name: "orders",
  initialState: {
    orderData: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.orderData = action.payload;
    },
  },
});

const { setOrder } = orderReducer.actions;

export const getUserOrderData = (userId) => {
  return async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const Headers = { authorization: token };
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/orders/user/${userId}/order`,
        {
          headers: Headers,
        }
      );
      dispatch(setOrder(response.data.reverse()));
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

export const addOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      let { token } = getState().auth;
      const Headers = { authorization: token };
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cart/delete/:cartId`,
        getState().cart.cartData,
        {
          headers: Headers,
        }
      );
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/orders/order/add`,
        data,
        {
          headers: Headers,
        }
      );
      getUserOrderData(response.data.userId);
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

export default orderReducer.reducer;
