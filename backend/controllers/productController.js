const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIfeatures = require("../utils/apiFeatures");

//get products - {{base_url}}/api/v1/products/
//it is a handler function
exports.getProducts = async (req, res, next) => {
  let resultPerPage = 8;
  const apiFeatures = new APIfeatures(productModel.find(), req.query)
    .search()
    .filter()
    .paginate(resultPerPage); //creating obj for APIfeatures class

  const products = await apiFeatures.query;
  const totalProductsCount = await productModel.countDocuments({}); //getting total productws count in the database
  res.status(200).json({
    success: true,
    count: totalProductsCount,
    products: products,
    resultPerPage: resultPerPage,
  });
};

//create product - {{base_url}}/api/v1/products/new/
//it is a handler function
exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  let BASE_URL = process.env.BACKEND_URL;
  if(process.env.NODE_ENV === "production")
  {
    BASE_URL = `${req.protocol}://${req.get('host')}`; //server_url
  }
  if (req.files.length > 0) {
    //when there images in the request
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }
  req.body.images = images;
  req.body.user = req.user.id;
  const product = await productModel.create(req.body);
  res.status(201).json({
    success: true,
    product: product,
  });
});

//get single product - {{base_url}}/api/v1/product/:id
//it is a handler function
exports.getSingleProduct = async (req, res, next) => {
  const product = await productModel
    .findById(req.params.id)
    .populate("reviews.user", "name email");
  if (!product) {
    // return next(new ErrorHandler("Product Not Found", 404)); //this is a object passed to next middleware bcuz it shoule be returned without going further donw to succes message.

    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product: product,
  });
};

//admin update product -- {{base_url}}/api/v1/admin/products/:id
//it is a handler function
exports.updateProduct = async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  let images = [];
  if(req.body.imagesCleared === 'false')
  { //old images still exist
    images = product.images;
  }
  let BASE_URL = process.env.BACKEND_URL;
  if(process.env.NODE_ENV === "production")
  {
    BASE_URL = `${req.protocol}://${req.get('host')}`; //server_url
  }
  if (req.files.length > 0) {
    //when there images in the request
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }
  req.body.images = images;
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //to only get the new product, not the old one
    runValidators: true, //it will check whether the input satisfy the validation/condition we mentioned in the schema (required field) And if the data is not in the correct form, it will show the error msg we gave.
  });
  res.status(200).json({
    sucess: true,
    product: product,
  });
};

//delete product --{{base_url}}/api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//REVIEWS
//create review - /api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating: rating,
    comment: comment,
  };
  const product = await productModel.findById(productId);
  //reviews is an array,it has array properties
  let isReviewed = false; //incase if that array is empty

  if (
    product.reviews &&
    Array.isArray(product.reviews) &&
    product.reviews.length != 0
  ) {
    //not empty array
    //checking whether the user already gave the review for the same product.

    isReviewed = product.reviews.find((review) => {
      //true or false
      return review.user.toString() == req.user.id.toString();
    });
  } else {
    //empty array
    product.reviews = [];
  }

  if (isReviewed) {
    //review already exist
    //updating existing review [not allowing the user to create another new review]
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //create new review and push it into array
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //finding the avg of all product reviews for a product
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
 
//Get reviews for a specific product - /api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.id).populate("reviews.user", "name email");

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete reviews - /api/v1/review?id=.....&productId=......
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  //2query parameters 1.review id 2.product id
  const product = await productModel.findById(req.query.productId);

  //filtering & saving the reviews into a new array, that don't match the review id user sent.
  const reviews = await product.reviews.filter((review) => {
    review._id.toString() != req.query.id.toString;
  });

  //recalculating the number of reviews for that product
  const numOfReviews = reviews.length;

  //recalculating the ratings for that product
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;

  //no ratings available -- > 0
  ratings = isNaN(ratings) ? 0 : ratings;

  //saving product document
  await productModel.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

//ADMIN
//get admin prodcts -api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await productModel.find();
  res.status(200).send({
    success: true,
    products,
  });
});
