const mongoose = require('mongoose');
//const slugify = require('slugify');

const Schema = mongoose.Schema;

const variationSchema = Schema({
    color:{
        type: String,
        required:[true, 'a product must have a color']
    },
    size: {
        type: Array,
        required: [true, 'a product must have a size']
    },
    quantity: {
        type: Number,
        default: 0
    },
    
})


const Variation = mongoose.model("Variation", variationSchema);

module.exports = Variation;