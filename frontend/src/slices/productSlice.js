import { createSlice } from "@reduxjs/toolkit";

// state- apple
// slices---- state
// slice 1-- > products related states

const productSlice = createSlice({
  name: "products",
  initialState: {
    //before refresh the page
    loading: false,
    product:{}
  },
  reducers: {
        //reducer functionality 1
        productRequest(state, action) { //previous state, action dispatched
          return {  //returning the state changes
            loading: true,
          }; 
        }, 
        //reducer functionality 2
        productSuccess(state, action) {
          //successful API request
          return {
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
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = productSlice;
export const { productRequest, productSuccess, productFail } = actions; //actions creators

export default reducer;
