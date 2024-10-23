require('dotenv').config()

const amqplib = require('amqplib')

// const RABBITMQ_URL = process.env.RABBITMQ_URL
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

let connection, channel

async function createRabbitMQConnection() {
  try {
    if (!connection) {
      connection = await amqplib.connect(RABBITMQ_URL)
      channel = await connection.createChannel();

      console.log("RabbitMQ connected!")
    }
  }
  catch(error) {
    console.error("RabbitMQ connection failed", error)
    process.exit(1) //Exits process if connection fails
  }
}

async function sendToQueue(queue, message) {
  try {
    if (!channel) {
      await createRabbitMQConnection()
    }

    await channel.assertQueue(queue, {durable: true})
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true
    })
  }
  catch (error) {
    console.error("Error while performing send to Queue", error)
  }
}

async function consumeQueue(queue, callback) {
  try {
    if (!channel) {
      await createRabbitMQConnection()
    }

    await channel.assertQueue(queue, {durable: true})
    // channel.consume(queue, callback, {noAck: false})
    channel.consume(queue, (message) => {
      callback(message, channel); // Pass channel here
    }, { noAck: false });
  } 
  catch(error) {
    console.error("Error while performing consume queue")
  }
}

module.exports = { createRabbitMQConnection, sendToQueue, consumeQueue}