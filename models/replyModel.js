const mongoose = require('mongoose');


const User = require('./userModel');

const Schema = mongoose.Schema


const ReplySchema = Schema({
  reply: {
    type: String,
    required: [true, 'A reply can not be empty! Please provide some text expression.'] 
  },
  replyedBy:{
    type: Schema.Types.ObjectId, 
    ref: User,
    required: [true, 'A reply must have a user']
  },
  action: { 
    type: String,
    enum: ['' ,'like', 'dislike'],
    default: ''
  }
  
}, { timestamps: true})

const Reply = mongoose.model("Reply", ReplySchema);

module.exports = Reply;