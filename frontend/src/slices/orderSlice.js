import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: {},
    userOrders: [],
    adminOrders: [],
    loading: false,
    isOrderDeleted: false,
    isOrderUpdated: false,
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
    //admin - reducer functionality 1 -getting orders
    adminOrderRequest(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    adminOrderSuccess(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
      };
    },
    adminOrderFail(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    //admin - reducer functionality 1 -deleting orders
    deleteOrderRequest(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },
    deleteOrderFail(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        isOrderDeleted: false,
        error: action.payload,
      };
    },
    //admin - reducer functionality 1 -updating orders
    updateOrderRequest(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    updateOrderSuccess(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        isOrderUpdated: true,
      };
    },
    updateOrderFail(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: false,
        isOrderUpdated: false,
        error: action.payload,
      };
    },
    clearOrderDeleted(state, action) {
      return {
        ...state,
        isOrderDeleted: false,
      };
    },
    clearOrderUpdated(state, action) {
      return {
        ...state,
        isOrderUpdated: false,
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
  adminOrderRequest,
  adminOrderSuccess,
  adminOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  clearOrderDeleted,
  clearOrderUpdated,
} = actions; //actions creators

export default reducer;
