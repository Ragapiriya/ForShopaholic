const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token)
    {  //no token [expired]
        return next(new ErrorHandler('Login first to handle this resource',401));
        // terminate the access to the resource
    }
    //token exists
    //decoding token to get original data [actually we sent userid as data.]
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //= userid

    req.user = await userModel.findById(decoded.id);
    next(); //calling next middleware, and the request will be sent.

}) 

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role) )
        {   //user's roles is not included in the roles array [array contains the roles who has authorization to access the given resource]
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
        }
        next();
    }
}