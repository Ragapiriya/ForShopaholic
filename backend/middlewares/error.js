const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //internal server error
  if (process.env.NODE_ENV == "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err, //there will be field of data including the name of the error, message, statuscode,etc,etc
    });
  }
  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = { ...err };

    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message);
      err.statusCode = 400
    }
    if (err.name == "CastError") {
      message = "Resource not found";
      error = new ErrorHandler(message);
      err.statusCode = 400

    }
    if (err.code == 11000) {
      //When registering the same email again
      let message = `Duplicate ${Object.keys(err.keyValue)} error`;
      error = new ErrorHandler(message);
      err.statusCode = 400

    }
    if (err.name == "JSONWebTokenError") {
      //Invalid JWT token
      let message = `JSONWebToken is invalid. Try again`;
      error = new ErrorHandler(message);
      err.statusCode = 400

    }
    if (err.name == "TokenExpiredError") {
      //Expired JWT token
      let message = `JSONWebToken is expired. Try again`;
      error = new ErrorHandler(message);
      err.statusCode = 400

    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
