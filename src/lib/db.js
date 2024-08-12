import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file



import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('DB_URL is not defined');
    }

    console.log('MongoDB URI:', uri); // Debugging line to ensure the URI is set

    // Connect to MongoDB without deprecated options
    await mongoose.connect(uri);

    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database:', error);
  }
}
