import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: {},
    userOrders: [],
    loading: false,
  },
  reducers: {
    //reducer functionality 1 -create order request
    createOrderRequest(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        orderDetails: action.payload.order,
      };
    },
    createOrderFail(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        //returning the state changes
        ...state,
        error: null
      };
    },
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = orderSlice;
export const { createOrderRequest, createOrderSuccess, createOrderFail,clearError } =
  actions; //actions creators

export default reducer;
