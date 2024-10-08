const expressModule = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/productController");
const router = expressModule.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/product/:id").get(getSingleProduct); //'id' is a parameter
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/review").put(isAuthenticatedUser, createReview);
router.route("/reviews").get(getReviews);
router.route("/review").delete(deleteReview);

//ADMIN
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

module.exports = router;
