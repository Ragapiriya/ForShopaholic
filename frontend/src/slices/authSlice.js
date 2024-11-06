import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    //before refresh the page
    loading: false,
    isAuthenticated: false,
  },
  reducers: {
    //reducer functionality 1
    loginRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state, //previouse state data
        loading: true, //only updating the loading
      };
    },
    //reducer functionality 2
    logintSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    //reducer functionality 3
    loginFail(state, action) {
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
export const { loginRequest, loginSuccess, loginFail } = actions; //actions creators

export default reducer;
