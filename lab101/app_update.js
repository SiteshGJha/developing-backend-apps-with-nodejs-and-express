const mongoose = require('mongoose')
const Employee = require('./employee')
const Schema = mongoose.Schema

const uri = 'mongodb://localhost:27017'

mongoose.connect(uri, {'dbName':'employeeDB'})
  .then(() => {
    console.log("db connected!")


    return Employee.updateOne({emp_name: "John Doe"}, {email: "jdoe@somewhere.com"})
  })
  .then((updateOneResult) => {
    console.log("update one result ", updateOneResult)
    console.log("One record updated")

    return Employee.updateMany({ age : {$gt: 30}},{location: "New York"})
  })
  .then((updateManyResult) => {
    console.log("update many result", updateManyResult)
    console.log("Many record updated")
  })
  .catch(error => {
    console.error("error", error)
  })
  .finally(() => {
    mongoose.connection.close()
    console.log("mongoose connection closed!")
  })