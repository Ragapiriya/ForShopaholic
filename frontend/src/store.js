import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import userRedcer from "./slices/userSlice";

//reducer is for product, user, order
//here we combine it
const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  userState: userRedcer,
});

//returns a store object
const store = configureStore({
  reducer, //funtionality- able to change the state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  //It allows asynchronous activities [ during api calls]
});

export default store;
