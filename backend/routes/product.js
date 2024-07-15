const expressModule= require('express');
const { getProducts, newProduct } = require('../controllers/productController');
const router= expressModule.Router();

router.route('/products').get(getProducts)
router.route('/products/new').post(newProduct)

module.exports=router;