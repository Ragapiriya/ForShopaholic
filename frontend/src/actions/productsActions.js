import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

export const getProducts = (currentPage) => async (dispatch) => {
  try {
    dispatch(productsRequest()); //dispatch the action 'productRequest' from reducers
    let link = `/api/v1/products?page=${currentPage}`;

    const { data } = await axios.get(link); //data = json data
    dispatch(productsSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(productsFail(error.response.data.message));
  }
};
export const getSearchedProducts = (keyword, price) => async (dispatch) => {
  try {
    dispatch(productsRequest()); //dispatch the action 'productRequest' from reducers
    let link = `/api/v1/products`;

    if (keyword) {
      //if keyword exists, cancatanation
      link += `?keyword=${keyword}`;
    }
    if (price) {
      //if keyword exists, cancatanation
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }
    const { data } = await axios.get(link); //data = json data
    dispatch(productsSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(productsFail(error.response.data.message));
  }
};
