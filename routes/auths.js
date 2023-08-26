const express = require('express');
const router = express.Router();
const {signUp, signIn} = require('../controllers/authController');


router.post('accounts/signup', signUp);
router.get('accounts/signin', signIn);


module.exports = router;
