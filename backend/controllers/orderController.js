const catchAsyncError = require("../middlewares/catchAsyncError");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

const ErrorHandler = require("../utils/errorHandler");
//create new order - /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  // const user = await userModel.findById(req.user.id); //id is received from the request from isAuthenticated middleware.

  const order = await orderModel.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(), //at the time of creation of order.
    user: req.user.id, //user:req.user.id
  });
  res.status(201).json({
    success: true,
    order: order,
  });
});

//get a specific order - /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email"); //1st- collection name, 2nd- which fields to be received
  if (!order) {
    return next(new ErrorHandler(`Order ${req.params.id} not found`, 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//get loggedin user orders -/api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user.id }); //user id is obtained from 'isAuthenticatedUser' middleware
  res.status(200).json({
    success: true,
    orders,
  });
});

//ADMIN
//Get all orders - /api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmount = 0; //total amount of all orders
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//ADMIN
//update order [order status & stock] - /api/v1/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (order.orderStatus == "Delivered") {
    //Delivered already
    return next(
      new ErrorHandler(
        `Order ${req.params.id} has been already delivered. Status cannot be modified.`,
        400
      )
    );
  }

  //Not delivered yet
  //1. updating product stock of each order item.
  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });
  //2. Processing --> Delivered status
  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now(); //at the time of status changes.

  await order.save();

  res.status(200).json({
    success: true,
  });
});

//ADMIN
//delete order - api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler(`Order ${req.params.id} not found`, 404));
  }
  await order.remove;
  res.status(200).json({
    success: true,
  });
});

async function updateStock(productId, quantity) {
  const product = await productModel.findById(productId);
  product.stock -= quantity;
  product.save({ validateBeforeSave: false });
}
