const mongoose = require('mongoose')
const Schema = mongoose.Schema


const customerSchema = new Schema({
  user_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true }
})

module.exports = mongoose.model('customer', customerSchema) 