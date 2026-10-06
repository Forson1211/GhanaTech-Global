import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const isVercel = process.env.VERCEL === '1';
const isProduction = isVercel || process.env.NODE_ENV === 'production';

export const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  MONGODB_URI: process.env.MONGODB_URI || (isProduction ? '' : 'mongodb://127.0.0.1:27017/ghanatech_global'),
  JWT_SECRET: process.env.JWT_SECRET || (isProduction ? '' : 'local_development_only_change_before_deployment'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  UPLOAD_DIR: process.env.UPLOAD_DIR || path.resolve(__dirname, '../../uploads'),
  CV_STORAGE: process.env.CV_STORAGE || (isVercel ? 'blob' : 'local'),
  BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  isProduction,
  isVercel,
};

export function validateProductionEnvironment(): void {
  if (!env.isProduction) return;
  if (!env.MONGODB_URI) throw new Error('MONGODB_URI is required in production.');
  if (env.JWT_SECRET.length < 32 || env.JWT_SECRET.includes('change_in_production')) {
    throw new Error('Set a unique JWT_SECRET of at least 32 characters.');
  }
  if (env.isVercel && env.CV_STORAGE !== 'blob') {
    throw new Error('Vercel requires persistent Blob storage for CV uploads.');
  }
}
