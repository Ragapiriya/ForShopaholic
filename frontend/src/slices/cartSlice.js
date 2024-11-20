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
    cartLoadFail(state, action) {
      //Failed API request
      return {
        ...state,
        loading: false,
      };
    },
  },
});

//Action creators for the types of actions that are handled by the slice reducer.
const { actions, reducer } = cartSlice;
export const { addCartItemRequest, addCartItemSuccess, cartLoadFail } = actions; //actions creators

export default reducer;
