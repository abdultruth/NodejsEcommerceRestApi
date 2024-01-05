const mongoose = require('mongoose');


const User = require('./userModel');
const Order = require('./orderModel');
const Reply = require('./replyModel');

const Schema = mongoose.Schema


const OrderReviewSchema = Schema({
  reviewBody: {
    type: String,
    required: [true, 'A review can not be empty! Please provide some text expression.'] 
  },
  rating: {
    type: Number,
    default: 1.0,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10
  },
  createdBy:{
    type: Schema.Types.ObjectId, 
    ref: User,
    unique: true,
    required: [true, 'A review must have a user!']
  },
  order:{
    type: Schema.Types.ObjectId, 
    ref: Order,
    unique: true,
    required: [true, 'A review must belong to a order!']
  },
  reply: {
    type: Schema.Types.ObjectId, 
    ref: Reply,
  }
 
}, { timestamps: true})

const OrderReview = mongoose.model("OrderReview", OrderReviewSchema);

module.exports = OrderReview;
