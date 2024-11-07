import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //before refresh the page
    loading: false,
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
} = actions; //actions creators

export default reducer;
