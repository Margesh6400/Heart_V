import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection using Mongoose
// Replace <db_username> and <db_password> with your actual MongoDB username and password
const uri = "mongodb+srv://margeshpolara22it:RBpXLy8CDwqqORJM@cluster0.cviuq0s.mongodb.net/?appName=Cluster0";

mongoose.connect(uri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
}).then(() => {
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});