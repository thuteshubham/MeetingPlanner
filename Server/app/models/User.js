'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'passskdajakdjkadsj'
  },
  email: {
    type: String,
    default: ''
  },
  countryCode:{
    type: Number,
    default: +91
  },
  mobileNumber: {
    type: Number,
    default: 0
  },
  isAdmin:{
    type:Boolean,
    default:false
  }


})


mongoose.model('User', userSchema);
