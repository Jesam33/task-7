import mongoose from 'mongoose';

export async function connectToMongoDB() {
  try {
    const uri = process.env.DB_URL;
    if (!uri) {
      throw new Error('DB_URL is not defined');
    }
    
    // Connect to MongoDB with options
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Optionally include other options such as `useCreateIndex` or `useFindAndModify`
    });

    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database:', error);
  }
}
