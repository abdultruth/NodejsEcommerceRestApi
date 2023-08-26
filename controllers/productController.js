'use strict';

const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')


exports.getAllActiveProduct = catchAsync(async (req, res, next) => {

    const products = await Product.find();

    if(!products) {
        return next(new AppError(`No product found `, 404))
    }

    res.status(200).json({
        status: 'Success',
        length: products.length,
        requestedAt: req.requestTime,
        data: {
            products
        }
    });

})

exports.getOne = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findById({_id:id});
    if(!product) {
        return next(new AppError('No product found with the ID', 404))
    }
    res.status(200).json({
        status: 'Success',
        requestedAt: req.requestTime,
        data:{
            product
        }
    });
})



exports.createOne = catchAsync(async (req, res) => {
    const {name, price, category, variation, created_by} = req.body
    const product = await Product.create({
        name, price, 
        category, 
        variation,
        created_by
    });

    res.status(201).json({
        status: 'Success',
        requestedAt: req.requestTime,
        data: {
            product
        }
    });

})

exports.deleteOne = catchAsync(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete({_id:id});

  if(!product) {
    return next(new AppError('No product found with the ID', 404))
}
  
  return res.status(301).json({
    status: 'Success',
    requestedAt: req.requestTime,
    data:{
        product
    }
  });
})


exports.updateOne =  catchAsync(async (req, res) =>  {
    const id = req.params.id;
    const {name, price, category, variation, created_by} = req.body
    const product = await Product.findByIdAndUpdate(
        {_id:id}, {
        name, 
        price, 
        category, 
        variation, 
        created_by,
        is_active,
        images
    });

    if(!product) {
        return next(new AppError('No product found with the ID', 404))
    }

    res.status(301).json({
            status: 'Success',
            data: {
                product
            }
    });
})

