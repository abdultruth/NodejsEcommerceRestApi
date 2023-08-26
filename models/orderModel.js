const mongoose = require('mongoose');


const User = require('../models/userModel');
const Product = require('../models/productModel')


const Schema = mongoose.Schema;

const orderSchema = new Schema({
      order_by: {
       type: Schema.Types.ObjectId, ref: User,
       required:true
      },

      products: {type: [{
        type: Schema.Types.ObjectId, ref: Product
      }],
      required:true
      },

      is_active: {
        type: Boolean, default: true
      },
      
      cancel:{
        type: Boolean, default:false
      },
      completed:{
        type: Boolean, default:false
      },
      ordered_at: {
        type: Date,
        default: Date.now()
      },
      price_total:{
        type: mongoose.Decimal128
      }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;