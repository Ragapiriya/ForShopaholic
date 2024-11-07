import axios from "axios";
import {
  loginFail,
  loginRequest,
  loginSuccess,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
} from "../slices/authSlice";

//action 1 -login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(`/api/v1/login`, { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

//action 2 -clearing the authentication related errors action
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

//action 3 -register action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const config = {
      headers: {
        //userData contains different types of data [img], so --> changing the content-type
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};
