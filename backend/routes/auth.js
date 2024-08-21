const expressModule= require('express');
const router= expressModule.Router();
const {registerUser, loginUser} = require('../controllers/authController');


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;