const mongoose = require('mongoose');


const User = require('./userModel');
const Reply = require('./replyModel');
const Product = require('./productModel');
const { name } = require('pug');

const Schema = mongoose.Schema


const ProductReviewSchema = Schema({
  reviewBody: {
    type: String,
    required: [true, 'A review can not be empty! Please provide some text expression.'] 
  },
  rating: {
    type: mongoose.Decimal128,
    default: 1.0,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10
  },
  user:{
    type: Schema.Types.ObjectId, 
    ref: User,
    unique: true,
    required: [true, 'A review must have a user']
  },

  product: {
    type: Schema.Types.ObjectId, 
    ref: Product,
    required: [true, 'A review must belong to a product']
  },

  reply: {
    type: Schema.Types.ObjectId, 
    ref: Reply,
  },
  
}, 
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true }
}, 

{ timestamps: true}

);


ProductReviewSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'product',
  //   select: 'name'
  // })
  this.populate({
    path: 'user',
    select: 'firstname lastname image'
  });

  next();
});

const ProductReview = mongoose.model("ProductReview", ProductReviewSchema);

module.exports = ProductReview;
