const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = require('./employee')

const uri = 'mongodb://localhost:27017'

mongoose.connect(uri, {'dbName':'employeeDB'})
  .then(() => {
    console.log("db connected")

    return Employee.deleteOne({ age: {$lt: 30}, location: "New York" })
  })
  .then((deletedOne) => {
    console.log("Deleted document ", deletedOne)

    return Employee.deleteMany({ emp_name: { $regex: "R"} })
  })
  .then((deletedManyResults) => {
    console.log("Deleted many result", deletedManyResults)
  })
  .catch(err => {
    console.error("Error ", err)
  })
  .finally(() => {
    mongoose.connection.close()
  })