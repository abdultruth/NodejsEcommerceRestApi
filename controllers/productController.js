'use strict';

const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


const factory = require('./handlerFactory');


exports.getAllActiveProduct = catchAsync(async (req, res, next) => {

    const products = await Product.find();

    if(!products) {
        return next(new AppError(`No product found `, 404))
    }

    return res.status(200).json({
        status: 'Success',
        length: products.length,
        requestedAt: req.requestTime,
        data: {
            products
        }
    });

})


exports.getOneProduct = factory.getOne(Product, 'product', 'reviews');

// Do Not update passwordwith this 
exports.deleteOne = factory.deleteOne(Product,'product');
exports.updateProduct = factory.updateOne(Product, 'product');
exports.createOneProduct = factory.createOne(Product, 'product');

