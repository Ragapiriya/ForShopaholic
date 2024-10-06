//contains authentication related request handlers.

const userModel = require("../models/userModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
    avatar,
  });

  // const token = user.getJwtToken();
  // res.status(201).json({
  //   success: true,
  //   user: user,
  //   token: token,
  // });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    //either email or password not given
    return next(new ErrorHandler("Please enter email and password", 400)); //400 Bad request-the server cannot or will not process the request due to something that is perceived to be a client error.
  }

  //fetching user's details based on email.
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    //no such email
    return next(new ErrorHandler("Invalid email or password", 401)); // 401 aunthorized- the request lacks valid authentication credentials for the requested resource.
  }

  //email exists
  if (!(await user.isValidPassword(password))) {
    //password didn't match
    return next(new ErrorHandler("Invalid email or password", 401)); // 401- the request lacks valid authentication credentials for the requested resource.
  }

  //email exists and password is correct
  sendToken(user, 201, res);
});

exports.logoutUser = (req, res, next) => {
  //make the token null
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Loggedout successfully",
    });
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false }); //update user document

  //create reset url for backend api [ not for frontend]
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`; //= http://127.0.0.1/api/v1/password/token/{token}

  //message content for email
  const message = `Your password reset url is as follows \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

  //sending email
  try {
    sendEmail({
      email: user.email,
      subject: "ForShopaholic password resetting",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    //email cannot be sent - internal server error
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false }); //update user document
    return next(new ErrorHandler(err.message), 500);
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //getting the token from API url and hash it to get the details of the user

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //getting user details who has the same resetPasswordToken & expires time is greater than now time.
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  //such user doesn't exist
  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or expired"));
  }

  // user exists
  //checking whether the both fields sent through the request are same or not
  if(req.body.password !== req.body.confirmPassword)
  {
    return next(new ErrorHandler('Password does not match'));
  }

  user.password = req.body.password; //new password
  user.resetPasswordToken = undefined; //removing fields
  user.resetPasswordTokenExpire = undefined;

  await user.save({validateBeforeSave:false});
  sendToken(user,201,res);


});
