'use strict';

const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');


exports.getAllActiveCategory = catchAsync(async (req, res, next) => {
    const category = await Category.find();
    return res.status(200).json(category);
    next();
});

exports.getOne = catchAsync(async (req, res, next) => {
  
    const category = await Category.findById({_id:req.params.id});
    return res.status(301).json(category);
    next();
  });

exports.createOne = catchAsync(async (req, res, next) => {
    const {name, description} = req.body;
    const category = await Category.create({
        name, 
        description
    });

    return res.status(201).json({
                                    status:'Success',
                                    statusCode: 201,
                                    data:{
                                        category
                                    }
    });

    next();
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  
  const category = await Category.findByIdAndDelete({_id:req.params.id});
  return res.status(301).json(category);
  next();
});


exports.updateOne = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(
        {_id:req.params.id}, {name: req.body.name});
    return res.status(201).json({
        data:{
            category
        }});
    next();
});

