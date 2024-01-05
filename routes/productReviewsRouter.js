'use strict';

const express = require('express');

const router = express.Router();


const productReviewController = require('../controllers/productReviewController');
const authController = require('../controllers/authController');


/* auth routers listing. */
router
  .route('/')
  .get(productReviewController.getAllReviews)
  .post(
    authController.protect,
    productReviewController.setProductUserIds, 
    productReviewController.createOneReview
    );


router
  .route('/:id')
  .get(
    authController.protect, 
    productReviewController.getOne
    )
  .patch(
    authController.protect, 
    productReviewController.updateOneReview
    )
  .delete(
    authController.protect, 
    productReviewController.deleteOneReview
    );



module.exports = router;