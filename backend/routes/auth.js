const expressModule= require('express');
const router= expressModule.Router();
const {registerUser} = require('../controllers/authController');


router.route('/register').post(registerUser);

module.exports = router;