import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //before refresh the page
    loading: true,
    isAuthenticated: false,
  },
  reducers: {
    //reducer functionality 1 -login
    loginRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        loading: true, //only updating the loading
      };
    },
    //reducer functionality 2 -login
    loginSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    //reducer functionality 3 -login
    loginFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 4 -login
    clearError(state, action) {
      //Failed API request
      return {
        ...state,
        error: null,
      };
    },
    //reducer functionality 1 -register
    registerRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        loading: true, //only updating the loading
      };
    },
    //reducer functionality 2 -register
    registerSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    //reducer functionality 3 -register
    registerFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 -loading user details [user is already logined before.]
    loadUserRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        isAuthenticated: false,
        loading: true, //only updating the loading
      };
    },
    //reducer functionality 2 -loading user details [user is already logined before.]
    loadUserSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    //reducer functionality 3 -loading user details [user is already logined before.]
    loadUserFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
      };
    },
    //reducer functionality 1 - logout action
    logoutSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    //reducer functionality 2 -logout action
    logoutFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 -register
    updateProfileRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        loading: true, //only updating the loading
        isUpdated: false,
      };
    },
    //reducer functionality 2 -register
    updateProfileSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isUpdated: true,
      };
    },
    //reducer functionality 3 -register
    updateProfileFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality  -
    clearUpdateProfile(state, action) {
      //clearing update state
      return {
        ...state,
        isUpdated:false,
      };
    },
    //reducer functionality 1 -update password
    updatePasswordRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        loading: true, //only updating the loading
        isUpdated: false,
      };
    },
    //reducer functionality 2 -update password
    updatePasswordSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };
    },
    //reducer functionality 3 -update password
    updatePasswordFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 -forgot password
    forgotPasswordRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        loading: true, //only updating the loading
        message: null,
      };
    },
    //reducer functionality 2 -forgot password
    forgotPasswordSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    },
    //reducer functionality 3 -forgot password
    forgotPasswordFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 -reset password
    resetPasswordRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        loading: true, //only updating the loading
      };
    },
    //reducer functionality 2 -reset password
    resetPasswordSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isAuthenticated: true, //successful reset password
        user: action.payload.user,
      };
    },
    //reducer functionality 3 -reset password
    resetPasswordFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = authSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFail,
  clearError,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  clearUpdateProfile,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = actions; //actions creators

export default reducer;
