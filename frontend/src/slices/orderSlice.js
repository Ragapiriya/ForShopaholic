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
    //reducer functionality 1 -orders of a user
    userOrderRequest(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    userOrderSuccess(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        userOrders: action.payload.orders,
      };
    },
    userOrderFail(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //reducer functionality 1 -detail of specific order
    orderDetailRequest(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    orderDetailSuccess(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },
    orderDetailFail(state, action) {
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
        error: null,
      };
    },
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = orderSlice;
export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  userOrderRequest,
  userOrderSuccess,
  userOrderFail,
  clearError,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
} = actions; //actions creators

export default reducer;
