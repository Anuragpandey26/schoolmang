import express from 'express';
import sequelize from './config/database.js';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);

// Sync database and start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});