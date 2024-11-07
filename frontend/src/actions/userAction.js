import axios from "axios";
import {
  loginFail,
  loginRequest,
  loginSuccess,
  clearError,
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
