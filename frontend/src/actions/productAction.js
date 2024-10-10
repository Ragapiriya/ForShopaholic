import axios from "axios";
import {
  productFail,
  productRequest,
  productSuccess,
} from "../slices/productSlice";


//getting product id as a parameter
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest()); //dispatch the action 'productRequest' from reducers
    const { data } = await axios.get(`/api/v1/product/${id}`); //data = json data
    dispatch(productSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(productFail(error.response.data.message));
  }
};
