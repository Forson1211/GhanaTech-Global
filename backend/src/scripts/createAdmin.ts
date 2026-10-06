import { z } from 'zod';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { validateProductionEnvironment } from '../config/environment';
import { User } from '../models/User';
import { hashPassword } from '../utils/password';

async function createAdmin() {
  const input = z.object({
    email: z.string().email().transform((email) => email.toLowerCase()),
    password: z.string().min(12, 'Use an administrator password of at least 12 characters.'),
    name: z.string().min(2),
  }).parse({
    email: process.env.ADMIN_INITIAL_EMAIL,
    password: process.env.ADMIN_INITIAL_PASSWORD,
    name: process.env.ADMIN_INITIAL_NAME || 'GhanaTech Administrator',
  });
  validateProductionEnvironment();
  await connectDatabase();
  await User.collection.createIndex({ email: 1 }, { unique: true });
  if (await User.findOne({ email: input.email })) throw new Error('This account already exists. No account was changed.');
  await User.create({ name: input.name, email: input.email, password: await hashPassword(input.password), role: 'admin', isActive: true });
  console.log('Administrator created. No other data was changed.');
}

createAdmin().catch(() => {
  console.error('Could not create the administrator. Check the database settings, unique email and password length.');
  process.exitCode = 1;
}).finally(disconnectDatabase);
