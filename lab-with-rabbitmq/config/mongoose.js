require('dotenv').config()
const mongoose = require('mongoose')

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'employeeDB101',
    })

    console.log("Connected to MongoDB")
  }
  catch (error) {
    console.error("MongoDB connection failed", error)
    process.exit(1)
  }
}

module.exports = {connectToMongoDB} 
