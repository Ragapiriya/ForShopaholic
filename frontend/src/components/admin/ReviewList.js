import { Button } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import { deleteReview, getReviews } from "../../actions/productAction";
export default function ReviewList() {
  const {
    reviews = [],
    loading = true,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);
  const [productId, setProductId] = useState("");
  const deleteHandler = (e, id) => {
    e.target.disabled = true; //disabling the button
    dispatch(deleteReview(productId, id));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };
  const setReviews = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Rating", field: "rating", sort: "asc" },
        { label: "User", field: "user", sort: "asc" },
        { label: "Comment", field: "comment", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };
    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        user: review.user.name,
        comment: review.comment,
        actions: (
          <Fragment>
            <Button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={(e) => deleteHandler(e, review._id)}
            >
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });
    return data;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isReviewDeleted) {
      //successful creation
      toast.success("Review Deleted Successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearReviewDeleted()),
      });
      dispatch(getReviews(productId));

      return;
    }
  }, [error, isReviewDeleted, navigate]);
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="h1 my-4">Review List</h1>
        <div className="row justify-content-center mt-5">
          <div className="col-5">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  onChange={(e) => setProductId(e.target.value)}
                  value={productId}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-block py-2"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setReviews()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
