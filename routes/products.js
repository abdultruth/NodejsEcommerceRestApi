const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Home = require('../controllers/homeController');




/* GET users listing. */
router
.route('/')
.get(productController.getAllActiveProduct)
.post(productController.createOne)


router
.route('/:id')
.get(productController.getOne)
.patch(productController.updateOne)
.delete(productController.deleteOne)

module.exports = router;
