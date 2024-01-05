
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const  factory = require('../controllers/handlerFactory');

const  ProductReview = require('../models/productReviewModel');


exports.getAllReviews = catchAsync(async(req, res, next) => {
    const reviews = await ProductReview.find();
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

exports.setProductUserIds = (req, res, next) => {
    if(!req.body.product) req.body.product = req.params.productId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
} 

exports.createOneReview = factory.createOne(ProductReview, 'review');
exports.getOne=factory.getOne(ProductReview, 'Product Review');

// exports.getOne = catchAsync(async(req, res, next) => {
//     const review = await ProductReview.find({_id:req.params.id});
//     return res.status(200).json({
//         status: 'success',
//         statusCode: 200,
//         data: {
//             review
//         }
//     });
// });



exports.updateOneReview = catchAsync(async(req, res, next) => {
    const review = await ProductReview.findByIdAndUpdate({_id:req.params.id}, req.body)
    return res.status(301).json({
        status: 'success',
        statusCode: 301,
        data: {
            review
        }
    });
});



exports.deleteOneReview = catchAsync(async(req, res, next) => {
    const review = await ProductReview.findByIdAndDelete({_id:req.params.id})
    return res.status(301).json({
        status: 'success',
        statusCode: 301,
        data: {
            review
        }
    });
});




