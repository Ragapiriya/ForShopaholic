const expressModule= require('express');
const getProducts = require('../controllers/productController');
const router= expressModule.Router();

router.route('/products').get(getProducts)
module.exports=router;