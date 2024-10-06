require('dotenv').config()
const express = require('express')
const session = require('express-session')

const app = express()

app.use(express.json())

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set for production true 
}))

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log({username, password})

  if (username === 'username' && password === 'password') {
    req.session.user = username
    res.send("loggedin success!")
  } else {
    res.send('invalid credential')
  }
})


app.get('/dashboard', (req, res) => {

  console.log(req.session)
  if (req.session.user) {
    res.send(`welcome ${req.session.user}`)
  } else {
    res.send('please login')
  }
})

app.listen(3002, () => {
  console.log("server running on port 3002")
})