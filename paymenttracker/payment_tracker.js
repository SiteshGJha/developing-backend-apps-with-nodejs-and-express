const express = require('express')
const mongoose = require('mongoose')
const VendorPaymentsRouter = require('./routes/vendor_payment')

const app = express()
const PORT = 3000

app.use(express.json())


//connect to mongodb
const uri = 'mongodb://localhost:27017'
mongoose.connect(uri, {dbName: "transactionsDB"})

app.use("/vendor_payments", VendorPaymentsRouter)

app.listen(PORT, () => {
  console.log("server is running on PORT: ", PORT)
})
