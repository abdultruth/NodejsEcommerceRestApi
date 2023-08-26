const mongoose = require('mongoose');


const User = require('../models/userModel');
const Variation = require('../models/variationModel');
const Category = require('../models/categoryModel');
const Review = require('../models/reviewModel');


const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true,'A product must have a name !'],
        unique: true,
        trim: true
    },
    slug: String,
    price:{
        type: mongoose.Decimal128 ,
        required: true,
    },
    mainImage:{
      type: [String],
      required: [true,'A product must have at least one image !']
    },
    images:{
        type: [String],
        required: [true,'A product must have sub image !']
    },
    imagesId: Array,
    created_at: {
        type: Date,
        default: Date.now()
    },
    reviews: {
        type: mongoose.ObjectId, ref: Review
    },
    category: { 
        type: mongoose.ObjectId, ref: Category 
    },

    variation: {
        type: mongoose.ObjectId, ref: Variation
    },

    created_by: {
        type: Schema.Types.ObjectId, ref: User
    },

    updated_at: {
        type: Date,
        default: Date.now()
    },
    priceAfterDiscount: {
        type: Number,
        required: true,
        default: 0
      },
    priceDiscount: {
        type: Number,
        validate: {
          validator: function (value) {
            // this only points to current doc on NEW documnet creation
            return value < this.price;
          },
          message: 'Discount price ({VALUE}) should be below regular price'
        }
      },
      is_active: {
        type: Boolean, default:false
      }

    
}, { timestamps: true})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

