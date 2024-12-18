import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    //before refresh the page
    //getting the existing cart items
    items: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")) //cart items available
      : [], //no items - empty array
    loading: false,
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}, //empty obj
  },
  reducers: {
    //reducer functionality 1 - add to cart
    addCartItemRequest(state, action) {
      return {
        //returning the state changes
        ...state,
        loading: true,
      };
    },
    //reducer functionality 2
    addCartItemSuccess(state, action) {
      //successful API request

      const item = action.payload; //item we're adding to cart
      const isItemExist = state.items.find((i) => i.product === item.product);
      if (isItemExist) {
        //item already exists in the cart
        state = {
          ...state,
          loading: false,
        };
      } else {
        //item is new to the cart
        state = {
          items: [...state.items, item],
          loading: false,
        };
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
      return state;
    },
    //reducer functionality 3
    cartLoadFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
      };
    },
    //reducer functionality 1 - increase quantity
    increaseCartItemQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          //if the item from cart items list is same as the item we intended to change
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    //reducer functionality 2 - decrease quantity
    decreaseCartItemQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          //if the item from cart items list is same as the item we intended to change
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    //
    removeItemFromCart(state, action) {
      const filterItems = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItems", JSON.stringify(filterItems));

      return {
        ...state,
        items: filterItems,
      };
    },
    //reducer functionality -saving shipping info
    saveShippingInfo(state, action) {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
    //reducer functionality -order completion
    orderCompleted(state, action) {
      //removing info from local storage & session storage
      localStorage.removeItem("shippingInfo");
      localStorage.removeItem("cartItems");
      sessionStorage.removeItem("orderInfo");

      return {
        //same as initial state
        items: [], //no items - empty array
        loading: false,
        shippingInfo: {}, //empty obj
      };
    },
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = cartSlice;
export const {
  addCartItemRequest,
  addCartItemSuccess,
  cartLoadFail,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeItemFromCart,
  saveShippingInfo,
  orderCompleted,
} = actions; //actions creators

export default reducer;
