'use strict';

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync')


exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  return res.status(200).json({
    status:'Success',
    data:{
      users
  }
  });

});


exports.getOne = catchAsync(async(req, res, next) => {
  const id = req.params.id
  const user = await User.findById({_id:id});

  if(!user) {
    return next(new AppError('No User found with the ID', 404))
  }

  return res.status(200).json({
    status: 'Success',
    data: {
        user
    }
  });
});


exports.createOneUser = catchAsync(async (req, res, next) => {
  const {firstname, lastname, email, password, passwordConfirm} = req.body
  const user = await User.create({ firstname, lastname, email, password, passwordConfirm});
  return res.status(201).json({
    status: 'Success',
    data:{
      user
    }})
});



exports.updateMe = catchAsync(async (req, res, next) => {

  const {firstname, lastname, email, image, isActive} = req.body

  if(req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update. Please use /updateMyPassword.', 400));
  }

  const filterBody = filterObj(req.body, 'name', 'email');

  if (req.file) filterBody.photo = req.file.filename;

  const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
     new: true,
     runValidators: true
  });
  
  return res.status(301).json({
    status:'Success',
    data: {
      user
    }
  })
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete({_id:id});
  return res.status(301).json({
    status: 'Success',
    data:{
      user
    }
  })
});
