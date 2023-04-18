'use strict';

const Users = require('../models/userModel');

const signUp = async (req, res, next) => {
        const user = await Users.create({
            firstname: req.body.firstname, 
            lastname: req.body.lastname, 
            email: req.body.email, 
            password: req.body.password 
        });
        return res.status(201).json({user: user,
                message: `You ${user.firstname}  ${user.lastname} have Successfully Signup.`,
        });
        next();
}


const signIn = async (req, res, next) => {
    const user = await Users.findOne({email:req.body.email, password: req.body.password});
    return res.status(200).json({ user, message: `You have successfully login ${user.firstname}  ${user.lastname}`});
    next();
}


module.exports = {signUp, signIn};