//NOT WORKING
require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
// const session = require('express-session')
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/users')



const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
// }))

app.use('/user', userRoutes)

app.post('/login', (req, res) => {
  const user = req.body.user

  if (!user) {
    return res.status(404).json({message: "Body empty"})
  }

  let accessToken = jwt.sign({data: user}, process.env.SESSION_SECRET, { expiresIn: 60 * 60 })

  // req.session.authorization = {
  //   accessToken
  // }

  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Ensure secure cookie in production (HTTPS)
    sameSite: 'strict',
  });

  res.status(200).json({message: "User logged in successfully"})
})


app.post('/user', (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).json({message: "user is not authenticated!"})
  }

  jwt.verify(token, process.env.SESSION_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({message: "invalid token"})
    }

    req.user = decoded.data
    next()
  })
})


const PORT = 3002

app.listen(PORT, () => { console.log(`server listening to port ${PORT}`)})