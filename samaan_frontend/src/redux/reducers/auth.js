import {
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("userAuthToken")
      ? localStorage.getItem("userAuthToken")
      : null,
    isAuthenticated: localStorage.getItem("userAuthToken") ? true : false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
const { setUser, setToken, setAuthenticated } = authReducer.actions;

export const userCreate = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/v1/registration",
        data
      );
      console.log(response);
      localStorage.setItem("userAuthToken", response.data.authToken);
      dispatch(setUser(response.data.userData));
      dispatch(setToken(response.data.authToken));
      dispatch(setAuthenticated(true));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

export const userLog = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/v1/login",
        data
      );
      localStorage.setItem("userAuthToken", response.data.authToken);
      dispatch(setUser(response.data.userData));
      dispatch(setToken(response.data.authToken));
      dispatch(setAuthenticated(true));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};

export const userOut = () => {
  return async (dispatch) => {
    localStorage.setItem("userAuthToken", null);
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setAuthenticated(false));
  };
};

export const userAuth = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/v1/authorization",
        {},
        { headers: { authorization: data.token } }
      );
      localStorage.setItem("userAuthToken", response.data.authToken);
      dispatch(setUser(response.data.userData));
      dispatch(setToken(response.data.authToken));
      dispatch(setAuthenticated(true));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
};
export default authReducer.reducer;
