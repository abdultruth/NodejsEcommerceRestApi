'use strict';

const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');


const User = require('../models/userModel');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');


const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, 
    {expiresIn: process.env.JWT_EXPIRES_IN});
}

const createSendToken = (user, statusCode, res, text) => {
  const message = text || ''; 
  const token = signToken(user._id)
  return res.status(statusCode).json({
    status:'success',
    token,
    message,
    data:{
      user
    }
  })
}

exports.signUp = catchAsync(async (req, res, next) => {
    const {
           firstname, 
           lastname, 
           email, 
           password, 
           passwordConfirm
        } = req.body;

    
    const newUser = await User.create(
                                    {
                                     firstname, 
                                     lastname, 
                                     email, 
                                     password,
                                     passwordConfirm
                                    }
                                  );

    const url = `${req.protocol}://${req.get('host')}/me`;
    // await new Email(user, url).sendWelcome()

    createSendToken(newUser, 201, res, `${newUser.firstname} ${newUser.lastname} you have Successfully Signed up.`)
    // const token = signToken(user._id);
        
})


exports.signIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    // check if email & password exist
    if(!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    } 

    const user = await User.findOne({email}).select('+password');

    // Check if user exist with the credentials
    if(!user || !await user.correctPassword(password, user.password)) {
       return next(new AppError('Invalid email or password', 401))
    }
    // if everything is ok, send token to client
    createSendToken(user, 200, res, `${user.firstname}  ${user.lastname} You have login successfully.`);
    
});


exports.logout = catchAsync(async (req, res, next) => {

  return res.status(400).json(
                        {
                          status: 'success',
                          statusCode: 400,
                          message:`Logout Successfully`
                        }
                      )
});


exports.protect = catchAsync(async (req, res, next) => {
  let token; 
  //1. Getting token and check if it there
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  
  if(!token) {
    return next(new AppError('You are not logged in! Please login to get access.', 401));
  }

  //2. Verification of token 
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. Check if user still exist 
  const currentUser = await User.findById(decoded.id);

  if(!currentUser) {
    return next(new AppError('The token belonging to this user does no longer exist.', 401))
  }


  //4. Check if user change password after the jwt was issued
  if(await currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(`${currentUser.firstname} ${currentUser.lastname} You might have recently changed password! \nPlease log in again.`, 401)
    );
  };

  //Grant access to the protected route
  //then put the requested user or user object on the request 
  req.user = currentUser;
  next();
})


exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['user', 'admin', '']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`${req.user.firstname} ${req.user.lastname}, You dont have permission to perform this action`, 403)
        );
    }
    next();
  }

}


exports.forgetPassword = catchAsync(async (req, res, next) => {
  
  //1) Get user based on POSTED email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(`There is no user with the email address ${req.body.email} `, 404))
  }
  
  //2) Generate the random reset token
  const resetToken = user.correctPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) Send it to user as Email
  const resetURL = `${req.protocol}://${req.get(
    'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forget your password ? Click on reset password link ${resetURL}. 
  \n If you didn't request for reset password ignore this email!`


  try {
      await new Email({
                        email: user.email,
                        subject: 'Your password reset token is only valid for 5mins',
                        message
                      });

      await new Email(user, resetURL).sendPasswordReset();

      return res.status(200).json({
                                    status: 'success',
                                    message: `Token sent to your email ${user.email}!`
                                  });

  } catch (err) {
      user.passwordResetToken = 'undefined';
      user.passwordResetExpires = 'undefined';
      await user.save({ validateBeforeSave: false });
      return next(
                new AppError('There was an error sending the email. Try again later!'), 500);
  }
  
});



exports.resetPassword = catchAsync(async(req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({ 
                                      passwordResetToken: hashedToken, 
                                      passwordResetExpires: {$gt: Date.now()} 
                                    }); 

    // 2) if token has not expired, and there is user, set the new password 
    if(!user) next(new AppError('Invalid Token or Token has expired', 400));

    // 3) Update changePasswordAt property for the user
    user.password = req.body.password;
    user.passwordConfirm  = req.body.password;
    user.passwordResetToken = 'undefined';
    user.passwordResetExpires = 'undefined';

    await user.save();

    // 3) Log the user in, send JWT

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res, `Check Your email ${user.email} for reset link`);
});



exports.updatePassword = catchAsync(async(req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if Posted current password is correct 
  // by using instance method declared in userModel
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError(`${req.user.firstname} ${req.user.firstname} Your current password is wrong.`, 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.save(); // user.findByidAndUpdate will NOT work as intended!
 
  // Log User in, send JWT 
  createSendToken(user, 200, res, 'password updated successfully.');
});



