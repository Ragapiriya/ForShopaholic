import { createSlice } from "@reduxjs/toolkit";

// state- apple
// slices---- state
// slice 1-- > products related states

const userSlice = createSlice({
  name: "user",
  initialState: {
    //before refresh the page
    loading: false,
    user: {},
    users: [],
    isUserUpdated: false,
    isUserDeleted: false,
  },
  reducers: {
    //reducer functionality 1 - getting users
    usersRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    usersSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    },
    //reducer functionality 3
    usersFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 - getting single user
    userRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    userSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    //reducer functionality 3
    userFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 - deleting a user
    deleteUserRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    deleteUserSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isUserDeleted: true,
      };
    },
    //reducer functionality 3
    deleteUserFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        isUserDeleted: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 - updating a user
    updateUserRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    updateUserSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isUserUpdated: true,
      };
    },
    //reducer functionality 3
    updateUserFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        isUserUpdated: false,
        error: action.payload,
      };
    },
    clearUserDeleted(state, action) {
      //Failed API request
      return {
        ...state,
        isUserDeleted: false,
      };
    },
    clearUserUpdated(state, action) {
      //Failed API request
      return {
        ...state,
        isUserUpdated: false,
      };
    },
    clearError(state, action) {
      //Failed API request
      return {
        ...state,
        error: null,
      };
    },
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = userSlice;
export const {
  usersRequest,
  usersSuccess,
  usersFail,
  userRequest,
  userSuccess,
  userFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  clearError,
  clearUserDeleted,
  clearUserUpdated,
} = actions; //actions creators

export default reducer;
