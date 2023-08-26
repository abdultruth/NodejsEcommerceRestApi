'use strict';
const Users = require('../models/userModel');
const catchAsync = require('../utils/catchAsync')


exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find({is_active:true});
  res.status(200).json({
    status:'Success',
    data:{
      users:users, 
      fullname: users.fullname
  }
  });
});


exports.getOne = catchAsync(async(req, res, next) => {
  const id = req.params.id
  const user = await Users.findById({_id:id})
  res.status(200).json({
    status: 'Success',
    data: {
        user
    }
  })
})


exports.createOneUser = catchAsync(async (req, res, next) => {
  const {firstname, lastname, email, password, passwordConfirm} = req.body
  const user = await Users.create({ firstname, lastname, email, password, passwordConfirm});
  res.status(201).json({
    status: 'Success',
    data:{
      user
    }})
})

exports.updateOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const {firstname, lastname, email, password, is_active} = req.body
  const user = await Users.findByIdAndUpdate({_id:id}, {firstname, lastname, email, password, is_active});
  res.status(301).json({
    status:'Success',
    data: {
      user
    }
  })
})

exports.deleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await Users.findByIdAndDelete({_id:id});
  return res.status(301).json({
    status: 'Success',
    data:{
      user
    }
  })
})
