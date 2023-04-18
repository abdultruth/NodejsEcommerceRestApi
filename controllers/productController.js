'use strict';

const Product = require('../models/productModel');

// import { Product } from '../models/productModel';


const getAllActiveProduct = async (req, res, next) => {

    const product = await Product.find();
    return res.status(200).json(product);
    next();
}

const getOne = async (req, res, next) => {
    let id = req.params.id
    const product = await Product.findById({_id:id});
    return res.status(200).json(product);
    next();
}

const createOne = async (req, res, next) => {
    const product = await Product.create({
        name: req.body.name, 
        price: req.body.price, 
        category: req.body.category, 
        variation: req.body.variation,
        created_by: req.body.created_by
    });

    return res.status(201).json(product);
    next();
}

const deleteOne = async (req, res, next) => {
  let id = req.params.id;
  const product = await Product.findByIdAndDelete({_id:id});
  return res.status(301).json(product);
  next();
}


const updateOne =  async (req, res, next) =>  {
    let id = req.params.id;
    const product = await Product.findByIdAndUpdate(
        {_id:id}, {name: req.body.name, 
        price: req.body.price, 
        category: req.body.category, 
        variation: req.body.variation,
        created_by: req.body.created_by,
        images: req.file
     });
        return res.status(201).json(product);
    next();
}


module.exports = { getAllActiveProduct, createOne, deleteOne, updateOne, getOne };
