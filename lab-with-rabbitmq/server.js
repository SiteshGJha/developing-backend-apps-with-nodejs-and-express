import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

import { connectToMongoDB } from './config/mongoose.js';
import { createRabbitMQConnection } from './config/rabbitmq.js';
import employeeRoutes from './routes/employeeRoutes.js';
import { startEmployeeConsumer } from './consumers/employeeConsumer.js';

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

app.use(cors())

await connectToMongoDB()
await createRabbitMQConnection()
await startEmployeeConsumer()


//Employee routes
app.use('/api/employees', employeeRoutes)

app.listen(PORT, () => { console.log("server running on port ", PORT) })