const express = require('express')
const { bulkUploadEmployees } = require('../controllers/employeeController')

const router = express.Router()

//bulk employee upload route
router.post('/bulk-upload', bulkUploadEmployees)

module.exports = router