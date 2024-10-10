const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// const employeeSchema = new Schema({
//   emp_name: { type: String, required: true },
//   Department: { type: String, required: true },
//   salary: { type: Number, required: true },
//   onsite: { type: Boolean, default: false }
// })

const employeeSchema = new Schema({
  emp_name: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  email: { type: String, default: false }
})

module.exports = mongoose.model('employee', employeeSchema)