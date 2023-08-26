'use strict';

const Orders = require('../models/orderModel')

const getAllActiveOrders = async (req, res, next) => {
    const orders = await Orders.find()
    return res.status(200).json({
        status: 'Success',
        data:{
            orders
        }
    });
}

const getOne = async (req, res, next) => {
    let id = req.params.id
    const order = await Orders.findById({_id:id});
    return res.status(200).json({
        status: 'Success',
        data: {
          order
        }
    });
    next();
}

const createOne = async (req, res, next) => {
    const order = await Orders.create({
        order_by: req.body.user, 
        products: req.body.products,
        created_by: req.body.created_by
    });

    return res.status(201).json({
        status: 'Success',
        data:{
            order
        }
    });
    next();
}

const updateOne = async (req, res, next) => {
    const id = req.params.id;
    const order = await Orders.findByIdAndUpdate(
      {_id:id}, 
      { 
        order_by: req.body.user, 
        products: req.body.products,
        created_by: req.body.created_by
      });
    return res.status(301).json({
        status: 'Success',
        data: {
            order
        }
    });
    next();
  }

const deleteOne = async (req, res, next) => {
  let id = req.params.id;
  const order = await Orders.findByIdAndDelete({_id:id});
  return res.status(301).json(order);
  next();
}


module.exports = {
                   getAllActiveOrders,
                   getOne,
                   createOne,
                   updateOne,
                   deleteOne
                 }