import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth";
import productReducer from "../reducers/product";
import categoryReducer from "../reducers/categories";
import cartReducer from "../reducers/cart";
import feedbackReducer from "../reducers/feedback";
import OrderReducer from "../reducers/order";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    feedback: feedbackReducer,
    order: OrderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(),
});
