import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

export const getProducts =(page = 1)=> async (dispatch) => {
  try {
    dispatch(productsRequest()); //dispatch the action 'productRequest' from reducers
    const { data } = await axios.get(`/api/v1/products?page=${page}`); //data = json data
    dispatch(productsSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(productsFail(error.response.data.message));
  }
};
