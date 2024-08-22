const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token)
    {  //no token [expired]
        return next(new ErrorHandler('Login first to handle this resource',401));
    }

    //decoding token to get original data [actually we sent userid as data.]
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //= userid

    req.user = await userModel.findById(decoded.id);
    next(); //calling next middleware, and the request will be sent.

})