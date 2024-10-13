const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const session = require('express-session')

const Customer = require('./customer');
const saltRounds = 5;
const password = "admin"

const app = express()
app.use(express.json())

app.use(session({
  cookie: { maxAge: 120000},
  secret: "toasdfads",
  res: false,
  saveUninitialized: true,
  genid: () => uuid.v4() 
}));

const uri = 'mongodb://localhost:27017'

mongoose.connect(uri, {'dbName': 'customerDB'})
  .then(() => {
    console.log("DB connected!!")
  })
  .catch((error) => {
      console.error(error)
  })
  // .finally(() => {
  //   mongoose.connection.close() //close the connection
  // })

app.post('/api/add_customer', async (req, res) => {
    const data = req.body

    const documents = await Customer.find({user_name: data["user_name"] })

    if (documents.length > 0) {
      res.send('User already exists')
    }

    let hashedpwd = bcrypt.hashSync(data["user_name"], saltRounds)

    const customer = new Customer({
      user_name: data["user_name"],
      password: hashedpwd,
      age: data["age"],
      email: data["email"]
    })

    await customer.save()

    res.send("Customer added successfully!")
})

app.post('/api/login', async (req, res) => {
  const data = req.body
  console.log(data)

  let user_name = data["user_name"]
  let password = data["password"]

  const documents = await Customer.find({user_name: user_name })

  if (documents.length > 0) {
    let result = bcrypt.compare(password, documents[0]["password"])

    if (result) {
      const genidValue = req.sessionID;
      res.cookie('username', user_name);
      // res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
      res.send("User logged In")
    } else {
      res.send("Password Incorrect! Try again")
    }

  } else {
    res.send("User Information incorrect!")
  }

})

// GET endpoint for user logout
app.get('/api/logout', async (req, res) => {
  req.session.destroy((err) => {
      if (err) {
        console.error(err);
      } else {
        res.cookie('username', '', { expires: new Date(0) });
        res.redirect('/');
      }
    });
});

const PORT = 3002

app.listen(PORT, () => { console.log(`server listening to port ${PORT}`)})