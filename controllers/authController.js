'use strict';

const { promisify } = require('util')
const jwt = require('jsonwebtoken') 

const Users = require('../models/userModel');
const catchAsync = require('../utils/catchAsync')
const AppError = require('./../utils/appError')



const signToken = id => {
  return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}



const signUp = catchAsync(async (req, res, next) => {
    const {
           firstname, 
           lastname, 
           email, 
           password, 
           passwordConfirm
        } = req.body

    
    const user = await Users.create(
                                    {
                                     firstname, 
                                     lastname, 
                                     email, 
                                     password,
                                     passwordConfirm
                                    }
                                  );

    const token = signToken(user._id)

    res.status(201).json(
                        {
                          user,
                          token,
                          message: ` ${user.firstname} ${user.lastname} you have Successfully Signup.`,
                        }
                      );
        
})


const signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    // check if email & password exist
    if(!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    } 

    const user = await Users.findOne({email}).select('+password');

    // Check if user exist with the credentials
    if(!user || !await user.correctPassword(password, user.password)) {
       return next(new AppError('Invalid email or password', 401))
    }
    // if everything is ok, send token to client
    const token = signToken(user.id)

    return res.status(200).json(
                                { 
                                  status: 'success',
                                  statusCode: 200,
                                  token, 
                                  message: `${user.firstname}  ${user.lastname} You have login successfully`
                                }
                              );
})

const protect = catchAsync(async (req, res, next) => {
  let token; 
  //1. Getting token and check if it there
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  
  if(!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401))
  }

  //2. Verification of token 
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  //3. Check if user still exist 
  const freshUser = await Users.findById(decoded.id)

  if(!freshUser) {
    return next(new AppError('The token belonging to this user does no longer exist.', 401))
  }


  //4. Check if user change password after the jwt was issued
  

  next();
})



module.exports = {
                  signUp, 
                  signIn,
                  protect
                };