const mongoose = require('mongoose');
const env = require('./env');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log(`Successfully connected to MongoDB in ${env.NODE_ENV} mode`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase, env };