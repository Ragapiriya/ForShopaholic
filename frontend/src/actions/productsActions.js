import axios from "axios";
import {
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
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
export const getSearchedProducts =
  (keyword, price, category, rating) => async (dispatch) => {
    try {
      dispatch(productsRequest()); //dispatch the action 'productRequest' from reducers
      let link = `/api/v1/products`;

      if (keyword) {
        //if keyword exists, cancatanation
        link += `?keyword=${keyword}`;
      }
      if (price) {
        //if price exists, cancatanation
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (category) {
        //if category exists, cancatanation
        link += `&category=${category}`;
      }
      if (rating) {
        //if rating exists, cancatanation
        link += `&ratings=${rating}`;
      }
      const { data } = await axios.get(link); //data = json data
      dispatch(productsSuccess(data)); //dispatch another action after api call
    } catch (error) {
      //data is the json data with success,message fields
      dispatch(productsFail(error.response.data.message));
    }
  };

//ADMIN actions
export const getAdminProducts = async (dispatch) => {
  try {
    dispatch(adminProductsRequest()); //dispatch the action 'productRequest' from reducers
    const { data } = await axios.get(`/api/v1/admin/products`);
    dispatch(adminProductsSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(adminProductsFail(error.response.data.message));
  }
};
