'use strict';

const Variation = require('../models/variationModel');


exports.getAllActiveVariation = async (req, res, next) => {
    const variation = await Variation.find();

    return res.status(200).json({
        status: 'Success',
        length: variation.length,
        requestedAt: req.requestTime,
        data: {
            variation
        }
    });
    next();
}

exports.createOne = async (req, res, next) => {
    const { name, color, size } = req.body
    const variation = await Variation.create({
        name, 
        color,
        size
    });

    return res.status(201).json(variation);
    next();
};


exports.updateOne =  async (req, res, next) =>  {
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

exports.deleteOne = async (req, res, next) => {
  let id = req.params.id;
  const variation = await Variation.findByIdAndDelete({_id:id});
  return res.status(301).json(variation);
  next();
}


