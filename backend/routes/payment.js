const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const { proccessPayment, sendStripeApi } = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, proccessPayment);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
