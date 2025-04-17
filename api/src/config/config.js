const mongoose = require('mongoose');

const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/heart_demo_0'
};

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI || 'mongodb+srv://parth:parth@cluster0.qnt7mo6.mongodb.net/heart_demo_0?retryWrites=true&w=majority';

  try {
    await mongoose.connect(uri, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = { config, connectToDatabase };