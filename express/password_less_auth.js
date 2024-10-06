require('dotenv').config()

const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
app.use(express.json())

const users = {}

//setup nodemail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

app.post('/request-access', (req, res) => {

  const { email } = req.body

  const code = Math.floor(100000 + Math.random() * 9000000).toString()

  users[email] = code

  console.log(`send code ${code} to user ${email}`)
  
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Access Code',
    text: `Your verification code is ${code}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("error sending email", error)
      return res.status(500).send('Failed to send email')
    } 

    console.log('email sent', info.response)
    res.send("code sent to email")
  })
})

app.post('/verify-code', (req, res) => {
  const { email, code } = req.body

  if (users[email] === code) {
    res.send("Access granted")
  } else {
    res.send("Invalid code")
  }
})


app.listen(3002, () => { console.log("server running on port 3002") })