const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")


const Email = mongoose.Schema({
  address: {
    type: String,
    lowercase: true,
    required: [true, "Can't be blank"],
    match: [/\S+@\S+\.\S+/, 'Invalid email format'], 
    index: true,
    unique: true
  }, 
  isValidated: {
    type: Boolean,
    default: false
  }
})

const userSchema = mongoose.Schema({
  EmailAddress: {
    type: Email,
    required: true
  },
  Password:{
    type: String,
    required: true
  },
  FirsName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  CompanyName: String,
  Role: String
})

module.exports = mongoose.model("User", userSchema, "usersCollection")