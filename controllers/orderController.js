'use strict';

const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllActiveOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find();

    return res.status(200).json({
        status: 'Success',
        length: orders.length,
        data:{
            orders
        }
    });
});


exports.getOneOrder = factory.getOne(Order, 'Order', 'reviews');

// exports.getOne = catchAsync(async (req, res, next) => {
    
//     const order = await Orders.findById({_id:req.params.id}).populate('reviews');

//     if(!order) return next(new AppError(`No Order found with Id: ${req.params.id}`, 404));

//     return res.status(200).json({
//         status: 'Success',
//         data: {
//           order
//         }
//     });
// });


exports.createOne = catchAsync(async (req, res, next) => {
    const order = await Order.create(req.body);

    return res.status(201).json({
        status: 'Success',
        data:{
            order
        }
    });
});

exports.updateOne = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const order = await Order.findByIdAndUpdate(
      {_id:id}, 
      { 
        order_by: req.body.user, 
        products: req.body.products,
        created_by: req.body.created_by
      });

      if(!order) return next(new AppError(`No Order found with Id: ${req.params.id}`, 404));

    return res.status(301).json({
        status: 'Success',
        data: {
            order
        }
    });

});


exports.deleteOne = catchAsync(async (req, res, next) => {
  let id = req.params.id;
  const order = await Order.findByIdAndDelete({_id:id});
  return res.status(301).json({
    status:200,
    data:{
        order
    }
    });
});
