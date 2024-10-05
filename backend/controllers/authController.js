//contains authentication related request handlers.

const userModel = require("../models/userModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
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
