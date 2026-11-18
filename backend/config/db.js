import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>')) {
    console.warn(
      '\n⚠️  MONGODB_URI is not configured yet in backend/.env.\n' +
        '   Please paste your MongoDB Atlas connection string into backend/.env and restart the server.\n'
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Atlas connection error: ${error.message}`);
    return false;
  }
};
