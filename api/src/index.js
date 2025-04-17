const express = require('express');
const mongoose = require('mongoose');
const { connectToDatabase } = require('./config/config');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection using centralized function
connectToDatabase();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', profileRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});