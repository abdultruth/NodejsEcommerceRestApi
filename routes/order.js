const express = require('express');
const router = express.Router();

const {getAllActiveOrders, getOne, createOne, updateOne, deleteOne} = require('../controllers/orderController')

router
.route('/')
.get(getAllActiveOrders)
.post(createOne)

router
.route('/:id')
.get(getOne)
.patch(updateOne)
.delete(deleteOne)

// router
// .route('/:order_id/:user_id')
// .get()
// .patch()
// .delete()


module.exports = router;
