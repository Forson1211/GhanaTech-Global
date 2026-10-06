import { Request, Response } from 'express';
import { loginSchema, updateProfileSchema } from '../validators/authValidator';
import * as authService from '../services/authService';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { env } from '../config/environment';

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { user, token } = await authService.loginUser(validatedData.email, validatedData.password);

    // Set secure httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: env.isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    sendSuccess(res, 'Sign in successful', { user, token });
  } catch (error: any) {
    sendError(res, error.message || 'Authentication failed', 401);
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie('token', {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.isProduction ? 'none' : 'lax',
  });
  sendSuccess(res, 'Signed out successfully');
}

export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  if (!req.user) {
    sendError(res, 'Unauthorized', 401);
    return;
  }

  sendSuccess(res, 'User profile retrieved', {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    lastLogin: req.user.lastLogin,
  });
}

export async function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      sendError(res, 'Unauthorized', 401);
      return;
    }

    const validatedData = updateProfileSchema.parse(req.body);
    const updatedUser = await authService.updateUserProfile(req.user._id.toString(), validatedData);

    sendSuccess(res, 'Profile updated successfully', {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update profile', 400);
  }
}
