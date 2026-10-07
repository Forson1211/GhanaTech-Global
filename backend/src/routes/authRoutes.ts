import { Router } from 'express';
import { login, logout, getMe, updateProfile } from '../controllers/authController';
import { authenticateUser } from '../middleware/authMiddleware';
import { LoginActivity } from '../models/LoginActivity';
import { sendSuccess } from '../utils/response';
import type { AuthenticatedRequest } from '../middleware/authMiddleware';

const router = Router();

// Public auth endpoints
router.post('/login', login);
router.post('/logout', logout);

// Protected auth endpoints
router.get('/me', authenticateUser, getMe);
router.put('/profile', authenticateUser, updateProfile);
router.get('/activity', authenticateUser, async (req: AuthenticatedRequest, res, next) => {
  try { sendSuccess(res, 'Sign-in activity', await LoginActivity.find({ userId: req.user!._id }).sort({ signedInAt: -1 }).limit(50).select('signedInAt device').lean()); }
  catch (error) { next(error); }
});

export default router;
