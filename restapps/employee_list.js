const mongoose = require('mongoose')
const Employees = require('./employee')

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

const uri = 'mongodb://localhost:27017'

mongoose.connect(uri, { 'dbName': 'employeeDB101'})

app.get('/api/employees', async (req, res) => {
    const documents = await Employees.find()
    res.json(documents)
})

app.post('/api/add_employee', async (req, res) => {
    console.log(req)
    console.log(req.body)

    const data = req.body

    const emp = new Employees({
      emp_name: data["name"],
      age: data["age"],
      location: data["location"],
      email: data["email"]
    })

    await emp.save();

    res.json({message: "Employee added successfully!"})
})

app.listen(PORT, () => {
  console.log("Server running in port")
})