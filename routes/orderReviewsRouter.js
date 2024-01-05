'use strict';

const express = require('express');

const router = express.Router();



const orderReviewController = require('../controllers/orderReviewController');
const authController = require('../controllers/authController');


/* auth routers listing. */
router
  .route('/')
  .get(orderReviewController.getAllReviews)
  .post(
    authController.protect, 
    orderReviewController.createOne
    );


router
  .route('/:id')
  .get(
    authController.protect, 
    orderReviewController.getOneOrderReview
    )
  .patch(
    authController.protect, 
    orderReviewController.updateOneReview
    )
  .delete(
    authController.protect, 
    orderReviewController.createOne
    );



module.exports = router;