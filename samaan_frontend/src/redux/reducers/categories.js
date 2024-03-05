import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const categoryReducer = createSlice({
  name: "categories",
  initialState: {
    categoriesData: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.categoriesData= action.payload;
    },
  },
});

const { setCategory } = categoryReducer.actions;

export const getCategory = () => {
  return async (dispatch) => {
    let response = await axios.get(
      `http://127.0.0.1:5000/api/v1/category`
    );
    dispatch(setCategory(response.data))
  };
};


export default categoryReducer.reducer;
