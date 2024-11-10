const express = require('express')
const router = express.Router();

const VendorPayments = require('../models/vendorPayment')


//Create a new invoice
router.post('/', async (req, res) => {
  try {
    const vendorPayment = new VendorPayments(req.body)
    const savedPayment = await vendorPayment.save()
    res.json(savedPayment)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

//Get All Invoice
router.get('/', async (req, res) => {
  try {
    // const vendorPayments = await VendorPayments.find({payment_status: req.params.payment_status})
    const vendorPayments = await VendorPayments.find();
    res.json(vendorPayments)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


//Get Invoice by payment status [Unpaid, partially unpaid, fully paid]
router.get('/:payment_status', async(req, res) => {
  try {
    const vendorPyaments = await VendorPayments.find({payment_status: req.params.payment_status})
    res.json(vendorPyaments)

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get a vendor invoices
router.get('/:vendor_id', async (req, res) => {
  try {
    const vendorPayments = await VendorPayments.find({vendor_id: req.params.vendor_id})
    res.json(vendorPayments)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Update a vendor payment for a transaction
router.put('/:transaction_id', async (req, res) => {
  try {
    const transaction = await VendorPayments.find({transaction_id: req.params.transaction_id})
    console.log("tranction: ",transaction)

    if (transaction.length > 0) { 
      const vendorPayments = new VendorPayments(req.body)
      transaction[0].balance_amount = transaction[0].balance_amount - vendorPayments.amount

      if (transaction[0].balance_amount <= 0) {
        transaction[0].payment_status = "Fully Paid"
      } else {
        transaction[0].payment_status = "Partially Paid"
      }

      transaction[0].payment_date = new Date()

      console.log("transactions", transaction)

      const savedPayment = await VendorPayments.updateOne({transaction_id: req.params.transaction_id}, transaction[0])
      res.json(savedPayment)

    } else {
      res.status(400).json({message: "No transaction found!"})
    }

  } catch(error) {
    console.log(error)
    res.status(400).json({message: error.message})
  }
})

//Delete vendor transaction
router.delete('/:transaction_id', async (req,res) => {
  try {
    const savedPayment = await VendorPayments.deleteOne({transaction_id: req.params.transaction_id})
    console.log(savedPayment)
    res.json({message: "Vendor payment deleted successfully!"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router