import mongoose from 'mongoose';
import { env } from './environment';

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDatabase(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!env.MONGODB_URI) throw new Error('MONGODB_URI is not configured.');
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(env.MONGODB_URI, {
      autoIndex: !env.isProduction,
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    }).catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }
  const connection = await connectionPromise;
  connectionPromise = null;
  return connection;
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  connectionPromise = null;
}
