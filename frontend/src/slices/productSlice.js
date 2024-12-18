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
    reviews: [],
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted: false,
    isProductUpdated: false,
    isReviewDeleted: false,
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
    clearProductCreated(state, action) {
      return {
        ...state,
        isProductCreated: false,
      };
    },
    //admin reducer functionality 1 - delete product
    deleteProductRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    deleteProductSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },
    //reducer functionality 3
    deleteProductFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        isProductDeleted: false,
        error: action.payload,
      };
    },
    //reducer functionality - clearing the state after creating the product.
    clearProductDeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },
    //admin reducer functionality 1 - update product
    updateProductRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    updateProductSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isProductUpdated: true,
        product: action.payload.product,
      };
    },
    //reducer functionality 3
    updateProductFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        isProductUpdated: false,
        error: action.payload,
      };
    },
    //reducer functionality - clearing the state after creating the product.
    clearProductUpdated(state, action) {
      return {
        ...state,
        isProductUpdated: false,
      };
    },
    //ADMIN - reducer functionality 1 - getting reviews
    reviewsRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    reviewsSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        reviews: action.payload.reviews,
      };
    },
    //reducer functionality 3
    reviewsFail(state, action) {
      //Failed API request
      return {
        loading: false,
        error: action.payload,
      };
    },
    //ADMIN reducer functionality 1 - delete review
    deleteReviewRequest(state, action) {
      //previous state, action dispatched
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    deleteReviewSuccess(state, action) {
      //successful API request
      return {
        ...state,
        loading: false,
        isReviewDeleted: true,
      };
    },
    //reducer functionality 3
    deleteReviewFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
        isReviewDeleted: false,
        error: action.payload,
      };
    },
    //reducer functionality - clearing the state after deleting the review.
    clearReviewDeleted(state, action) {
      return {
        ...state,
        isReviewDeleted: false,
      };
    },
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
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  clearProductDeleted,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  clearProductUpdated,
  reviewsRequest,
  reviewsSuccess,
  reviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  clearReviewDeleted,
} = actions; //actions creators

export default reducer;
