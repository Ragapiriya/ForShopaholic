import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  orderDetail as orderDetailAction,
  updateOrders,
} from "../../actions/orderAction";
import {
  clearError as orderClearError,
  clearOrderUpdated,
} from "../../slices/orderSlice";
import { Link } from "react-router-dom";
export default function UpdateOrder() {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    loading,
    isOrderUpdated = false,
    error,
    orderDetail,
  } = useSelector((state) => state.orderState);
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail || {};

  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrders(orderId, orderData));
  };

  //getting orders details
  useEffect(() => {
    if (orderDetail && orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  //alert
  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("Order Updated Succesfully!", {
        position: "bottom-center",
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      navigate("/admin/orders");

      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => {
          dispatch(orderClearError());
        },
      });
      return;
    }

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, dispatch, navigate]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          {/* order Details */}
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderDetail && orderDetail._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b>
                {user && user.name}
              </p>
              <p>
                <b>Phone:</b>
                {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus && orderStatus.includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((orderItem) => (
                    <div className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={orderItem.image}
                          alt={orderItem.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${orderItem.product}`}>
                          {orderItem.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${orderItem.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{orderItem.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
            <div className="col-12 col-lg-3 mt-5">
              <h4 className="h1 my-4">Order Status</h4>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={(e) => setOrderStatus(e.target.value)}
                  value={orderStatus}
                  name="status"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button
                className="btn btn-block"
                disabled={loading}
                onClick={submitHandler}
                id="status_btn"
              >
                Update Status
              </button>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
