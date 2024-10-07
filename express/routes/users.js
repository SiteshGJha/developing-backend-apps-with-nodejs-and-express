const express = require('express')

const router = express.Router()
router.use(express.json())

let users = [
  {
    firstName: "firstname1",
    lastName: "lastname1",
    email: "email1",
    DOB: "dob1"
  },
  {
    firstName: "firstname2",
    lastName: "lastname2",
    email: "email2",
    DOB: "dob2"
  },
  {
    firstName: "firstname3",
    lastName: "lastname3",
    email: "email3",
    DOB: "dob3"
  },
  {
    firstName: "firstname4",
    lastName: "lastname4",
    email: "email4",
    DOB: "dob4"
  }
]

router.get('/', (req, res) => {
  res.send(users)
})

router.get('/:email', (req, res) => {
  res.send("todo")
})

router.post('/new/', (req, res) => {
  res.send("todo")
})

router.put('/:email', (req, res) => {
  const email = req.params.email

  let filter_users = users.filter((user) => user.email === email)

  if (filter_users.length > 0) {
    let filtered_user = filter_users[0]

    let DOB = req.params.DOB

    if (DOB) {
      filtered_user.DOB = DOB
    }

    users = users.filter((user) => user.email !== email)
    users.push(filtered_user)

    res.send(`user with ${email} is updated`)
  } else {
    res.send("unable to find user")
  }
})

router.delete('/:email', (req, res) => {
  const email = req.params.email

  console.log("req.params", req.params)
  
  users = users.filter((user) => user.email !== email)

  res.send(`user with the email ${email} deleted`)
})

module.exports = router