import { createSlice } from "@reduxjs/toolkit";

// state- apple
// slices---- state
// slice 1-- > products related states

const productSlice = createSlice({
  name: "products",
  initialState: {
    //before refresh the page
    loading: false,
    product: {},
    isReviewSubmitted: false,
    isProductCreated: false,
  },
  reducers: {
    //reducer functionality 1
    productRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    productSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    },
    //reducer functionality 3
    productFail(state, action) {
      //Failed API request
      return {
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1- reviews
    createReviewRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    createReviewSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
      };
    },
    //reducer functionality 3
    createReviewFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    // reducer functionality - after submitting review
    clearReviewSubmitted(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearProduct(state, action) {
      return {
        ...state,
        product: {},
      };
    },
    //admin reducer functionality 1 - create product
    newProductRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    newProductSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isProductCreated: true,
        product: action.payload.product,
      };
    },
    //reducer functionality 3
    newProductFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        isProductCreated: false,
        error: action.payload,
      };
    },
    //reducer functionality - clearing the state after creating the product. 
    clearProductCreated(state,action)
    { 
      return {
        ...state,
        isProductCreated:false,
      }
    }
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = productSlice;
export const {
  productRequest,
  productSuccess,
  productFail,
  createReviewSuccess,
  createReviewRequest,
  createReviewFail,
  clearError,
  clearReviewSubmitted,
  clearProduct,
  newProductRequest,
  newProductSuccess,
  newProductFail,
  clearProductCreated,
} = actions; //actions creators

export default reducer;
