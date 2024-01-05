'use strict';

const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');


/* auth routers listing. */
router
  .route('/signup')
  .post(authController.signUp)

router
  .route('/signin')
  .post(authController.signIn);


  router
  .route('/logout')
  .post(authController.logout);



router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
