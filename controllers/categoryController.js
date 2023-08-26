'use strict';

const Category = require('../models/categoryModel');


const getAllActiveCategory = async (req, res, next) => {
    const category = await Category.find();
    return res.status(200).json(category);
    next();
}

const createOne = async (req, res, next) => {
    const category = await Category.create({name: req.body.name});
    return res.status(201).json(category);
    next();
}

const deleteOne = async (req, res, next) => {
  let id = req.params.id;
  const category = await Category.findByIdAndDelete({_id:id});
  return res.status(301).json(category);
  next();
}


const updateOne =  async (req, res, next) =>  {
    let id = req.params.id;
    const category = await Category.findByIdAndUpdate(
        {_id:id}, {name: req.body.name});
        return res.status(201).json(category);
    next();
}


module.exports = { getAllActiveCategory, createOne, deleteOne, updateOne };