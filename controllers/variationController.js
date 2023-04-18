'use strict';

const Variation = require('../models/variationModel');


const getAllActiveVariation = async (req, res, next) => {
    const variation = await Variation.find();
    return res.status(200).json(variation);
    next();
}

const createOne = async (req, res, next) => {
    const variation = await Variation.create({
        name: req.body.name, 
        color: req.body.color,
        size: req.body.size,
    });

    return res.status(201).json(variation);
    next();
};


const updateOne =  async (req, res, next) =>  {
    let id = req.params.id;
    const variation = await Variation.findByIdAndUpdate(
        {_id:id}, 
        {
            name: req.body.name, color: req.body.color,
            size: req.body.size
        });
        return res.status(201).json(variation);
    next();
};

const deleteOne = async (req, res, next) => {
  let id = req.params.id;
  const variation = await Variation.findByIdAndDelete({_id:id});
  return res.status(301).json(variation);
  next();
}





module.exports = { getAllActiveVariation, createOne, deleteOne, updateOne };
