const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



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
    required: [true, 'a user must have a password.'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password mismatch Please confirm your password!'],
    validate: {
      validator: function(el) {
        //This only works on .create() & .save()
        return el === this.passwordConfirm;
      },
      message:'Password doesn"t match!'
    }
  },
  join_date: {
    type: Date, default : Date.now()
  },
  role:{
      type: ['user', 'admin', 'agent'], 
      default: 'user'
  },
  is_active: {
    type: Boolean, default: true,
    select: false
  }

}, { timestamps: true});


UserSchema.pre('save', async function(next) {

  // only run if password is modified
  if(!this.isModified('password')) return next();
  
  // the password input value
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next() 

})


UserSchema.pre('/^find/', function(next) {
  this.find({is_active:{$ne: false}});
  next()
})

UserSchema.virtual('fullname')
.get(function() {return `${this.firstname} ${this.firstname}`;})
.set(function(v){
  const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
})


const Users = mongoose.model("Users", UserSchema);

module.exports = Users;