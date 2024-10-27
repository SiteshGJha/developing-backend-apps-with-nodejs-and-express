const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Customer = require('./customer')

const path = require('path')
const jwt = require('jsonwebtoken')
const saltRounds = 5

const secretKey = process.env.SECRET_KEY

let usersdict = {}
const PORT = 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 


const uri = 'mongodb://localhost:27017'
mongoose.connect(uri, {'dbName': 'customerDB'})


app.post('/api/login', async (req, res) => {
  const  {username, password} = req.body

  const user = usersdict[username]
  if (!user || !(await bcrypt.compare(password, user.hashedpwd))) {
    res.status(401).json({message: "User information incorrect"})
    return;
  }

  res.status(200).json({message: "Login successfully"})
})

app.post('/app/add_customer', async(req, res) => {
  const data = req.body
  console.log("data", data)

  const documents = await Customer.find({user_name: data["username"]})

  if (documents.length > 0) {
    res.status(409).json({message: "User already exists"})
    return;
  }

  const hashedpwd = await bcrypt.hash(data["password"], saltRounds)
  usersdict[data["username"]] = { hashedpwd }

  const customer = new Customer({
    user_name: data["username"],
    password: hashedpwd,
    age: data["age"],
    email: data["email"]
  })

  await customer.save()

  res.status(201).json({message: "Customer add successfully"})
})

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]

  if (!token) {
    res.sendStatus(401)
    return
  }

  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      res.sendStatus(403)
      return
    }

    req.user = user
    next();
  })
}

app.listen(PORT, () => {
  console.log(`Server listen to port ${PORT}`)
})