const mongoose = require("mongoose");
const validator = require('validator')





const User = mongoose.model("User", {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
              throw new Error('Email is Invalid')
          }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
  
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
          if (value < 0) {
              throw new Error('Age must be Positive Number')
          }
      }
    }
  });

  module.exports = User






  
// const me = new User({
//     name: '   Raushan Kumar    ',
//     email: 'rk@gmail.com',
//     age: 23, 
//     password: '1475654@123'
   
    
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error: ',error)
// })
