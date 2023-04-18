'use strict';
const Users = require('../models/userModel');


const getAllUsers = async (req, res, next) => {
      
  const users = await Users.find();
  return res.status(200).json(users)
  next();
};


const createUser = async (req, res, next) => {
  const user = await Users.create({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: req.body.password});
  return res.status(201).json(user)
  next();
}

const updateOne = async (req, res, next) => {
  let id = req.params.id;
  
  const user = await Users.findByIdAndUpdate(
    {_id:id}, 
    {firstname:req.body.firstname, 
      lastname: req.body.lastname, 
      email: req.body.email, 
      password: req.body.password
    });
  return res.status(301).json(user)
  next();
}

const deleteOne = async (req, res, next) => {
  let id = req.params.id;
  const user = await Users.findByIdAndDelete({_id:id});
  return res.status(301).json(user)
  next();
}


module.exports = {getAllUsers, createUser, deleteOne, updateOne};