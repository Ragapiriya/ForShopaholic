const expressModule= require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router= expressModule.Router();

router.route('/products').get(getProducts)
router.route('/products/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct); //'id' is a parameter
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);

module.exports=router;