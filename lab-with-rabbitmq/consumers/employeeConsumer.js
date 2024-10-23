const { consumeQueue } = require('../config/rabbitmq')
const Employee = require('../models/employee')


//Consumer function to save employees to MongoDB
async function processBulkEmployees(message, channel) {
  try {
    const employees = JSON.parse(message.content.toString())

    if (Array.isArray(employees)) {
      await Employee.insertMany(employees, {ordered: false})
      console.log(`Processed ${employees.length} employees`)
    } else {
      console.log("Invalid messsage format")
    }

    //Acknowledge the message
    // this.ack(message)
    channe.ack(message)
  }
  catch(error) {
    console.error('Error processing bulk employee')
  }
}

//start consuming message
async function startEmployeeConsumer() {
  await consumeQueue('employeeBulkUploadQueue', processBulkEmployees)
}

module.exports = { startEmployeeConsumer }