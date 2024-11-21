const catchAsyncError = require("../middlewares/catchAsyncError");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//request handler
exports.proccessPayment = catchAsyncError(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount:req.body.amount,
    currency: "usd",
    description: "TEST PAYMENt",
    metadata: { integration_check: "accept_payment" },
    shipping: req.body.shiping,
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});
//request handler
exports.sendStripeApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey:process.env.STRIPE_API_KEY,
  });
});
