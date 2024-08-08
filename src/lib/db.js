import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    const uri = process.env.NEXT_PUBLIC_DB_URL;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(uri);
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database', error);
  }
}
