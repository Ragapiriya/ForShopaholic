import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeItemFromCart,
} from "../../slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cartState);
  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock == 0 || count >= item.stock) return;
    dispatch(increaseCartItemQuantity(item.product));
  };
  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count == 1) return;
    dispatch(decreaseCartItemQuantity(item.product));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <Fragment>
      {items.length === 0 ? (
        <h2 id="products_heading" className="mt-5">
          Your Cart is Empty
        </h2>
      ) : (
        <Fragment>
          <h2 id="products_heading" className="mt-5">
            Your Cart: <b>{items.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {items.map((item) => (
                <Fragment>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/Rs.{item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">$.{item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn minus"
                            onClick={() => decreaseQty(item)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn plus"
                            onClick={() => increaseQty(item)}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn "
                          onClick={() =>
                            dispatch(removeItemFromCart(item.product))
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Total quantity:{" "}
                  <span className="order-summary-values">
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $.
                    {items.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn  btn-block"
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
