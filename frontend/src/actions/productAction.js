import axios from "axios";
import {
  createReviewFail,
  createReviewRequest,
  createReviewSuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  productFail,
  productRequest,
  productSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
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

//create a review
export const createReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewRequest()); //dispatch the action 'productRequest' from reducers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/review`, reviewData, config); //data = json data
    dispatch(createReviewSuccess(data)); //dispatch another action after api call
  } catch (error) {
    dispatch(createReviewFail(error.response.data.message));
  }
};
//getting product id as a parameter
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest()); //dispatch the action 'productRequest' from reducers
    const { data } = await axios.delete(`/api/v1/admin/product/${id}`); //data = json data
    dispatch(deleteProductSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(deleteProductFail(error.response.data.message));
  }
};

//update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest()); //dispatch the action 'productRequest' from reducers
    const config = {
      //multipart form data
      headers: {
        //userData contains different types of data [img], so --> changing the content-type
        "Content-type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );
    dispatch(updateProductSuccess(data)); //dispatch another action after api call
  } catch (error) {
    //data is the json data with success,message fields
    dispatch(updateProductFail(error.response.data.message));
  }
};
