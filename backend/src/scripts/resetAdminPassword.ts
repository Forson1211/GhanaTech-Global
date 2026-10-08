import { z } from 'zod';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { User } from '../models/User';
import { hashPassword } from '../utils/password';

async function resetAdminPassword() {
  const emailInput = process.argv[2] || process.env.ADMIN_INITIAL_EMAIL || 'ghanatechglobal@gmail.com';
  const passwordInput = process.argv[3] || process.env.ADMIN_INITIAL_PASSWORD;
  const nameInput = process.env.ADMIN_INITIAL_NAME || 'GhanaTech Administrator';

  if (!passwordInput) {
    console.error('Usage: npm run reset-admin --workspace backend [email] <password>');
    console.error('Or set ADMIN_INITIAL_PASSWORD in your environment.');
    process.exit(1);
  }

  const input = z.object({
    email: z.string().email().transform((email) => email.toLowerCase()),
    password: z.string().min(12, 'Use an administrator password of at least 12 characters.'),
    name: z.string().min(2),
  }).parse({
    email: emailInput,
    password: passwordInput,
    name: nameInput,
  });

  console.log(`Connecting to database to update administrator credentials for ${input.email}...`);
  await connectDatabase();
  await User.collection.createIndex({ email: 1 }, { unique: true });

  const existing = await User.findOne({ email: input.email });
  if (existing) {
    existing.password = await hashPassword(input.password);
    existing.role = 'admin';
    existing.isActive = true;
    await existing.save();
    console.log(`✓ Administrator password successfully updated for ${input.email}.`);
  } else {
    await User.create({
      name: input.name,
      email: input.email,
      password: await hashPassword(input.password),
      role: 'admin',
      isActive: true,
    });
    console.log(`✓ Administrator account created and password set for ${input.email}.`);
  }
}

resetAdminPassword()
  .catch((err) => {
    console.error('Password reset failed. Verify database connectivity and ensure password is at least 12 characters.');
    if (err?.message) console.error(err.message);
    process.exitCode = 1;
  })
  .finally(disconnectDatabase);
