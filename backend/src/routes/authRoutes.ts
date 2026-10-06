import { Router } from 'express';
import { login, logout, getMe, updateProfile } from '../controllers/authController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public auth endpoints
router.post('/login', login);
router.post('/logout', logout);

// Protected auth endpoints
router.get('/me', authenticateUser, getMe);
router.put('/profile', authenticateUser, updateProfile);

export default router;
