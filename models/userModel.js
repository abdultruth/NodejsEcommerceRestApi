const mongoose = require('mongoose');



const Schema = mongoose.Schema;

// Define a schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'user must provide a firstname'],
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
  password: {
    type: String,
    required: [true, 'a user must have a password.']
  },
  join_date: {
    type: Date, default : Date.now()
  },
  role:{
      type: ['user', 'admin', 'agent'], 
      default: 'user'
  },
  is_active: {
    type: Boolean, default: true
  }

});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;