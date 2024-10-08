const expressModule= require('express');
const { newOrder, getSingleOrder, myOrders, orders } = require('../controllers/orderController');
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/authenticate');
const router = expressModule.Router();


router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser,myOrders);


//ADMIN routes
router.route('/orders').get(isAuthenticatedUser,authorizeRoles('admin'),orders);

 
module.exports=router; 

