require('dotenv').config()
const express =  require('express')
const jwt = require('jsonwebtoken')

const app = express()
const secretKey = process.env.SECRET_KEY

app.use(express.json())

const users = [];

app.post('/register', (req, res) => {
  const {username, password} = req.body

  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    res.status(400).json({message: "Username already exists"})
  }

  const newUser = {
    id: users.length + 1,
    username,
    password
  }

  users.push(newUser)

  res.status(201).json({message: "User registered successfully"})
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  console.log(username, password)
  console.log('user object', users)

  const user = users.find((u) => u.username === username && u.password === password)

  console.log("user after find object", user)

  if (user) {
    const token = jwt.sign({id: user.id, username: user.username}, secretKey)
    res.json({token})
  } else {
    res.status(401).json({message: "Invalid credential"})
  }
})

app.get('/dashboard', verifyToken, (req, res) => {
  res.json({message: "Welcome to customer portal"})
})

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]

  if (typeof token !== 'undefined') {
    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        req.authData = authData
        next();
      }
    })
  } else {
    res.sendStatus(401)
  }
}

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
