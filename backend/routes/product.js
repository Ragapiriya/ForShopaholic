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
  getAdminProducts,
} = require("../controllers/productController");
const router = expressModule.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const multer = require("multer");
const path = require("path");

//middleware
const upload = multer({
  storage: multer.diskStorage({
    //in which folder we're going to upload the file
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    //name of the file == original name of the file
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct); //'id' is a parameter
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/review").put(isAuthenticatedUser, createReview);
router.route("/reviews").get(getReviews);
router.route("/review").delete(deleteReview);

//ADMIN
router
  .route("/admin/products/new")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    upload.array("images"),
    newProduct
  );
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

module.exports = router;
