import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const feedbackReducer = createSlice({
  name: "categories",
  initialState: {
    feedbacksData: [],
  },
  reducers: {
    setFeedback: (state, action) => {
      state.feedbacksData = action.payload;
    },
  },
});

const { setFeedback } = feedbackReducer.actions;

export const getFeedback = (productId) => {
  return async (dispatch) => {
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/feedback/${productId}`
    );
    dispatch(setFeedback(response.data));
  };
};

export const addFeedback = (data) => {
  return async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/feedback/add`,
        data
      );
      getFeedback(response.data.productId);
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

export default feedbackReducer.reducer;
