import { createSlice } from "@reduxjs/toolkit";

// state- apple
// slices---- state
// slice 1-- > products related states

const productsSlice = createSlice({
  name: "products",
  initialState: {
    //before refresh the page
    loading: false,
  },
  reducers: {
    //reducer functionality 1
    productsRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        loading: true,
      };
    },
    //reducer functionality 2
    productsSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.count,
        resultPerPage: action.payload.resultPerPage,
      };
    },
    //reducer functionality 3
    productsFail(state, action) {
      //Failed API request
      return {
        loading: false,
        error: action.payload,
      };
    },
    //ADMIN- reducer functionality 1
    adminProductsRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        loading: true,
      };
    },
    // ADMIN-reducer functionality 2 - no pagination
    adminProductsSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        products: action.payload.products,
      };
    },
    //ADMIN- reducer functionality 3
    adminProductsFail(state, action) {
      //Failed API request
      return {
        loading: false,
        error: action.payload,
      };
    },
    //ADMIN- reducer functionality
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
const { actions, reducer } = productsSlice;
export const {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFail,
  clearError,
} = actions; //actions creators

export default reducer;
