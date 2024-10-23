const { sendToQueue } = require('../config/rabbitmq')

//Bulk upload API
async function bulkUploadEmployees(req, res) {
  const employees = req.body;

  if (!Array.isArray(employees) || employees.length === 0) {
    res.status(400).json({message: "Invalid request, expected array of employees"})
  }

  try {
    await sendToQueue("employeeBulkUploadQueue", employees)
    console.log(`Processed ${employees.length} length`)
    res.status(200).json({message: "Employees queued for processing"})
  }
  catch(error) {
    console.error("Error queuing employees", error)
    res.status(500).json({message: "Failed to queue employees"})
  }
}

module.exports = { bulkUploadEmployees }