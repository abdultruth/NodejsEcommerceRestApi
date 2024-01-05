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
        required: [true, 'a category must have its own Description !']
    },
    image: {
      type: String
    },
    imageId: {
      type: String
      
    }
}, { timestamps: true});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
