const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User", //refers to 'User' collection in database
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  itemsPrice: {
    //total price of items only
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    //tax amount
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    //gross price
    type: Number,
    required: true,
    default: 0.0,
  },
  paidAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  orderStatus: {
    type: String,
    required: true,
    default:'Processing'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
