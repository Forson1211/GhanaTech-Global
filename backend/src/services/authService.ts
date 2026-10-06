import { User, IUser } from '../models/User';
import { comparePassword, hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export interface AuthResult {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    lastLogin?: Date;
  };
  token: string;
}

export async function loginUser(email: string, passwordPlain: string): Promise<AuthResult> {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password credentials');
  }

  if (!user.isActive) {
    throw new Error('Your account is deactivated. Please contact an administrator.');
  }

  const isMatch = await comparePassword(passwordPlain, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password credentials');
  }

  // Update lastLogin
  user.lastLogin = new Date();
  await user.save();

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
    },
    token,
  };
}

export async function getUserProfile(userId: string): Promise<IUser | null> {
  return User.findById(userId);
}

export async function updateUserProfile(
  userId: string,
  updateData: { name?: string; email?: string; currentPassword?: string; newPassword?: string }
): Promise<IUser> {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  if (updateData.name) {
    user.name = updateData.name.trim();
  }

  if (updateData.email) {
    const existing = await User.findOne({ email: updateData.email.toLowerCase().trim(), _id: { $ne: userId } });
    if (existing) {
      throw new Error('Email is already in use by another user');
    }
    user.email = updateData.email.toLowerCase().trim();
  }

  if (updateData.newPassword) {
    if (!updateData.currentPassword) {
      throw new Error('Current password is required to set a new password');
    }
    const isCurrentMatch = await comparePassword(updateData.currentPassword, user.password);
    if (!isCurrentMatch) {
      throw new Error('Current password does not match');
    }
    user.password = await hashPassword(updateData.newPassword);
  }

  await user.save();
  return user;
}
