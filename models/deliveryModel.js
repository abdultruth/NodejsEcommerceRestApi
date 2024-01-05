const mongoose = require('mongoose')

const User = require('./models/userModel')
const Order = require('./models/orderModel')

const Schema = mongoose.Schema

const deliverySchema = new Schema({
    firstname: {
        type: String,
        required: [true,'user must provide a firstname'],
    },
    lastname: {
        type: String,
        required: [true, 'user must provide a lastname'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'user must provide a email'],
    },
    address_line_1: {
        type: String,
        required: [true, 'user must provide a lastname'],
    },
    address_line_2: {
       type: String
    },
    phone_no_1:{
        type: String,
        required: [true, 'user must provide a phone number'],
    },
    phone_no_2:{
        type: String
    },
    created_at: {
        type:Date,
        default:Date.now()
    },
    delivery_date: {
        type:Date
    },
    delivered:{
        type: ['pending','returned','delivered']
    },
    recieved: {
        type: Boolean, default: false
    },
    recieved_by:{
        type: mongoose.objectId, ref: User
    },
    recieved_at:{
        type:Date
    },
    order:{
        type: mongoose.objectId, ref: Order
    }
}, { timestamps: true})

const Delivery = mongoose.model('Delivery', deliverySchema)

module.exports = Delivery;