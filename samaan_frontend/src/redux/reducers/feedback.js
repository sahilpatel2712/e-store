import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
  return async (dispatch, getState) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/feedback/add`,
        data
      );
      getFeedback(response.data.productId);
    } catch (error) {
      console.log(error);
    }
  };
};

export default feedbackReducer.reducer;
