import { Fragment, useEffect, useState } from "react";
import { createReview, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { clearReviewSubmitted } from "../../slices/productSlice";



export default function ProductDetail() {
  const { product, loading, isSubmitted } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();
  const { id } = useParams(); //getting parameters in URL
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  const increaseQuantity = () => {
    const count = document.querySelector(".count");
    if (product.stock === 0 || count.valueAsNumber >= product.stock) {
      //no products &
      return;
    }
    const qty = count ? count.valueAsNumber + 1 : 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber === 1) {
      //no products &
      return;
    }
    const qty = count ? count.valueAsNumber - 1 : 1;
    setQuantity(qty);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
  };
  useEffect(() => {
    dispatch(getProduct(id));
    if (isSubmitted) {
      handleClose(); //closing popup after submitting the review

      toast.alert("Review submitted successfully", {
        position: "bottom-center",
        onOpen: () => dispatch(clearReviewSubmitted()),
      });
    }
  }, [dispatch, id,isSubmitted]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product && product.name} />

          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel
                pause="hover"
                nextIcon={
                  product.images && product.images.length > 1 ? (
                    <span
                      aria-hidden="true"
                      className="carousel-control-next-icon"
                      style={{
                        backgroundColor: "#845ec2",
                        borderRadius: "50%",
                        padding: "10px",
                      }}
                    />
                  ) : null
                }
                prevIcon={
                  product.images && product.images.length > 1 ? (
                    <span
                      aria-hidden="true"
                      className="carousel-control-prev-icon"
                      style={{
                        backgroundColor: "#845ec2",
                        borderRadius: "50%",
                        padding: "10px",
                      }}
                    />
                  ) : null
                }
              >
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image._id}>
                      <img
                        className="d-block w-100"
                        src={image.image}
                        alt={product.name}
                        height="500"
                        width="500"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3 className="title">{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{
                    width: `${(product.ratings * 100) / 5}%`,
                  }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews}Reviews)</span>

              <hr />

              <p id="product_price">{product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn minus" onClick={decreaseQuantity}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn plus" onClick={increaseQuantity}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                disabled={product.stock === 0 ? true : false}
                className="btn btn-primary d-inline ml-4"
                onClick={() => dispatch(addCartItem(product._id, quantity))}
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                  id="stock_status"
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              <button
                id="review_btn"
                onClick={handleShow}
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  {/* <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>

                        
                      </div>
                    </div>
                  </div> */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Submit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ul className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <li
                            className={`star ${star <= rating ? "orange" : ""}`}
                            value={star}
                            onClick={() => setRating(star)}
                            onMouseOver={(e) =>
                              e.target.classList.add("yellow")
                            }
                            onMouseOut={(e) =>
                              e.target.classList.remove("yellow")
                            }
                          >
                            <i className="fa fa-star"></i>
                          </li>
                        ))}
                      </ul>

                      <textarea
                        name="review"
                        id="review"
                        className="form-control mt-3"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <button
                        className="btn my-3 float-right review-btn px-4 text-white"
                        aria-label="Close"
                        disabled={loading}
                        onClick={reviewHandler}
                      >
                        Submit
                      </button>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
