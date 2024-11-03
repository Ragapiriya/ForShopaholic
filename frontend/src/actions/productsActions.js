import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/productsSlice";

export const getProducts = (keyword, currentPage) => async (dispatch) => {
  try {
    dispatch(productsRequest()); //dispatch the action 'productRequest' from reducers
    let link = `/api/v1/products?page=${currentPage}`

    if (keyword)
    { //if keyword exists, cancatanation
      link +=`&keyword=${keyword}`;
    }
    const { data } = await axios.get(link); //data = json data
    dispatch(productsSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(productsFail(error.response.data.message));
  }
};
