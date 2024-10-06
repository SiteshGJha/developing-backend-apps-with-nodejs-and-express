require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY
const app = express()

app.use(express.json())

app.post('/login', (req, res) => {
  const { username, password } = req.body

  if(username === 'user' && password === 'password') {
    const token = jwt.sign({username}, secretKey, {expiresIn: '1h'});
    res.json({token})
  } else {
    res.send("Invalid credentials")
  }
})

app.get('/dashboard', (req, res) => {
  
  const token = req.headers['authorization']

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.send("Invalid token")
      } else {
        res.send(`Welcome ${decoded.username}`)
      }
    })
  } else {
    res.send("token missing!")
  }
})

app.listen(3002, () => { console.log("Server listening on port 3002")})

