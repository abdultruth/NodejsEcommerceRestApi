const express = require('express');
const router = express.Router();



const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const Home = require('../controllers/homeController');
const productUpload = require('../utils/productUpload')


router.param('id', (req, res, next, val) => {
   console.log(`Product id is: ${val}`);
   next();
});


/* GET users listing. */
router
.route('/')
.get(productController.getAllActiveProduct)
.post(
      authController.protect, 
      authController.restrictTo('admin', 'staff'),
      productUpload.uploadMultipleProductsImage,
      productUpload.ResizeProductImage,
      productController.createOneProduct
      );


router
.route('/:id')
.get(productController.getOneProduct)
.patch(
       authController.protect, 
       authController.restrictTo('admin','staff'), 
       productController.updateProduct
       )
.delete(
        authController.protect, 
        authController.restrictTo('admin', 'staff'), 
        productController.deleteOne
        );



module.exports = router;
