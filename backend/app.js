import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cron from 'node-cron';
import router from './routes/index.js';
import { sequelize } from './models/index.js';
import { createAutobotData } from './services/autobotService.js'; // Import the function
import cors from 'cors';

dotenv.config();

const app = express();
// Enable All CORS Requests
app.use(cors({origin:"*"}));
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', router);

// Or enable specific origins
// app.use(cors({ origin: 'http://your-allowed-origin.com' }));

// Your routes here
app.get('/api/data', (req, res) => {
  res.json({ message: 'CORS enabled' });
});






// Schedule the task to run every hour
cron.schedule('0 * * * *', async () => {  // Runs every hour at the 0th minute
  console.log('Cron job started'); // Log to verify execution
  try {
    await createAutobotData(); // Create Autobots
    console.log('500 Autobots created successfully');
  } catch (error) {
    console.error('Error creating Autobots:', error);
  }
});

// Synchronize models with database
sequelize.sync({ alter: true })
.then(() => {
  console.log('Database synchronized');
})
.catch(error => {
  console.error('Error synchronizing database:', error);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

