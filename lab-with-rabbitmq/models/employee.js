const mongoose = require("mongoose")
const Schema = mongoose.Schema

const employeeSchema = new Schema({
  emp_name: {type: String, require: true},
  age: {type: String, require: true},
  email: {type: String, require: true},
  location: {type: String, require: true}
})

module.exports = mongoose.model("Employee", employeeSchema) 