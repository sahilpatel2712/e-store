import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
        `${process.env.REACT_APP_BASE_URL}/registration`,
        data
      );
      localStorage.setItem("userAuthToken", response.data.authToken);
      dispatch(setUser(response.data.userData));
      dispatch(setToken(response.data.authToken));
      dispatch(setAuthenticated(true));
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

export const userLog = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        data
      );
      localStorage.setItem("userAuthToken", response.data.authToken);
      dispatch(setUser(response.data.userData));
      dispatch(setToken(response.data.authToken));
      dispatch(setAuthenticated(true));
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

export const userOut = () => {
  return async (dispatch) => {
    localStorage.setItem("userAuthToken", null);
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setAuthenticated(false));
    toast.success("Logout successfully", {
      position: "top-right",
    });
  };
};
export const userUpdate = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/address-update`,
        { address: data.address, userId: data.userId }
      );
      dispatch(setUser(data));
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

export const userAuth = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/authorization`,
        {},
        { headers: { authorization: data.token } }
      );
      localStorage.setItem("userAuthToken", response.data.authToken);
      dispatch(setUser(response.data.userData));
      dispatch(setToken(response.data.authToken));
      dispatch(setAuthenticated(true));
     
    } catch (error) {
      toast.error(error.response.data?.error, {
        position: "top-right",
      });
    }
  };
};
export default authReducer.reducer;
