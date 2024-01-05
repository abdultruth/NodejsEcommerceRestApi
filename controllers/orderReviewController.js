const  OrderReview = require('../models/orderReviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('../controllers/handlerFactory');


exports.getAllReviews = catchAsync(async(req, res, next) => {
    const reviews = await OrderReview.find();
    if(!reviews) return next(new AppError(`Reviews not Found or Doest Not Exist`, 404));
    return res.status(200).json({
        status: 'success',
        length: reviews.length,
        statusCode: 200,
        data: {
            reviews
        }
    });
});


exports.createOne = catchAsync(async(req, res, next) => {
     
    const newReview = await OrderReview.create(req.body);
    return res.status(201).json({
        status: 'success',
        statusCode: 201,
        data: {
            newReview
        }
    });
});

exports.getOneOrderReview = factory.getOne(OrderReview, 'Order Review');

// exports.getOne = catchAsync(async(req, res, next) => {
//     const review = await OrderReview.find({_id:req.params.id});
//     return res.status(200).json({
//         status: 'success',
//         statusCode: 200,
//         data: {
//             review
//         }
//     });
// });



exports.updateOneReview = catchAsync(async(req, res, next) => {
    const review = await OrderReview.findByIdAndUpdate({_id:req.params.id}, req.body)
    return res.status(301).json({
        status: 'success',
        statusCode: 301,
        data: {
            review
        }
    });
});



exports.deleteOneReview = catchAsync(async(req, res, next) => {
    const review = await OrderReview.findByIdAndDelete({_id:req.params.id})
    return res.status(301).json({
        status: 'success',
        statusCode: 301,
        data: {
            review
        }
    });
});




