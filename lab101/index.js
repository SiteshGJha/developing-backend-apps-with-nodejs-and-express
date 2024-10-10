const mongoose = require('mongoose')
const Employee = require('./employee')

const uri = 'mongodb://localhost:27017'

mongoose.connect(uri, {'dbName':'employeeDB'});

let newEmployee = new Employee({
  emp_name: "Raja Ram",
  age: 23,
  location: "mumbai",
  email: "raja@ram.gmail.com"
})

newEmployee.save().then(function() {
  Employee.find().then(data => {
    console.log(data)
    mongoose.connection.close()
  })
}).catch(error => { console.log(error)})
