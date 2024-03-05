import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import productReducer from "../reducers/product";
import categoryReducer from "../reducers/categories";
import { thunk } from "redux-thunk";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(),
});
