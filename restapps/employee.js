const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employees =  new Schema({
  emp_name: {type: String, require: true},
  age: {type: Number, require: true},
  location: {type: String, require: true},
  email: {type: String, require: true}
})

module.exports = mongoose.model('employees', employees)