'use strict';

const Users = require('../models/userModel');
const catchAsync = require('../utils/catchAsync')

const signUp = catchAsync(async (req, res, next) => {
    const {
           firstname, 
           lastname, 
           email, 
           password
        } = req.body
    const user = await Users.create({
                                     firstname, 
                                     lastname, 
                                     email, 
                                     password 
                                    });
    res.status(201).json({
                          user: user,
                          message: `You ${user.firstname} ${user.lastname} have Successfully Signup.`,
                        });
        
})


const signIn = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({email:req.body.email, password: req.body.password});
    return res.status(200).json({ user, message: `You have successfully login ${user.firstname}  ${user.lastname}`});
    next();
})


module.exports = {
                  signUp, 
                  signIn
                };