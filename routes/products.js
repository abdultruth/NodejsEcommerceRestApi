const express = require('express');
const router = express.Router();


const productController = require('../controllers/productController');
const { protect } = require('../controllers/authController')
const Home = require('../controllers/homeController');




/* GET users listing. */
router
.route('/')
.get(productController.getAllActiveProduct)
.post(protect, productController.createOne)


router
.route('/:id')
.get(productController.getOne)
.patch(protect, productController.updateOne)
.delete(protect, productController.deleteOne)

module.exports = router;
