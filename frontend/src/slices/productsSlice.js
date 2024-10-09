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
      return {
        loading: true,
      };
    },
    //reducer functionality 2
    productsSuccess(state, action) {
      //successful API request
      return {
        loading: false,
        products: action.payload.products,
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
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = productsSlice;
export const { productsRequest, productsSuccess, productsFail } = actions; //actions creators

export default reducer;
