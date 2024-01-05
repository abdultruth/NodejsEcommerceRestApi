const express = require('express');
const router = express.Router();

const {getAllActiveOrders, getOneOrder, createOne, updateOne, deleteOne} = require('../controllers/orderController')
const authController = require('../controllers/authController')

router
.route('/')
.get(authController.protect, getAllActiveOrders)
.post(createOne)

router
.route('/:id')
.get(getOneOrder)
.patch(updateOne)
.delete(deleteOne);

router
.route('/:order_id/:user_id')
.post(createOne);



module.exports = router;
