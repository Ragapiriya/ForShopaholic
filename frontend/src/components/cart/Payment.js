import { Fragment, useEffect } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "../cart/Shipping";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderAction";
import { clearError as clearOrderError } from "../../slices/orderSlice";
export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);
  const paymentData = {
    amount: Math.round(orderInfo && orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        province: shippingInfo.province,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      toast.error(orderError, {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
      return;
    }
  });
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   document.querySelector("#pay_btn").disabled = true;
  //   try {
  //     const data = await axios.post("/api/v1/payment/process", paymentData);
  //     const clientSecret = data.client_secret;
  //     const result = stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardNumberElement),
  //         billing_details: {
  //           name: user.name,
  //           email: user.email,
  //         },
  //       },
  //     });

  //     if (result.error) {
  //       //payment-not success
  //       toast.error((await result).error.message, {
  //         position: "bottom-center",
  //       });
  //       document.querySelector("#pay_btn").disabled = false;
  //     } else {
  //       //payment -success
  //       if ((await result).paymentIntent.status === "succeeded") {
  //         toast.success("Payment success", {
  //           position: "bottom-center",
  //         });
  //         dispatch(orderCompleted());
  //         navigate("/order/success");
  //       } else {
  //         toast.warning("Please Try Again!!", {
  //           position: "bottom-center",
  //         });
  //       }
  //     }
  //   } catch (error) {}
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.log("Result error");
        toast(result.error.message, {
          type: "error",
          position: "bottom-center",
        });
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          console.log("success payment");
          toast.success("Payment Success!", {
            position: "bottom-center",
          });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));
          navigate("/order/success");
        } else {
          console.log("Not success payment");
          toast("Please Try again!", {
            type: "warning",
            position: "bottom-center",
          });
        }
      }
    } catch (error) {
      console.log("Out of trycatch error");
    }
  };

  return (
    <Fragment>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay - {`Rs ${orderInfo && orderInfo.totalPrice}  `}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
