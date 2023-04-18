const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'a category must have a name !'],
        unique: true
    },
    description: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      imageId: {
        type: String,
        required: true
      },
    created_at: {
        type: Date,
        default: Date.now()
    },

    updated_at: {
        type: Date,
        default: Date.now()
    },

});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
