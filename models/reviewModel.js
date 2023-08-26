const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ReviewSchema = Schema({
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (val) => Math.round(val * 10) / 10
      },
      ratingsQuantity: {
        type: Number,
        default: 0
      }
    
}, { timestamps: true})

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
