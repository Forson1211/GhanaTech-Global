import { Router } from 'express';
import {
  submitApplication,
  getAdminApplications,
  getAdminApplicationById,
  updateApplication,
  deleteApplication,
  downloadCV,
} from '../controllers/applicationController';
import { authenticateUser } from '../middleware/authMiddleware';
import { uploadCV } from '../middleware/uploadMiddleware';

const router = Router();

// Public route: submit talent application with optional CV upload
router.post('/', uploadCV.single('cv'), submitApplication);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminApplications);
router.get('/admin/:id', authenticateUser, getAdminApplicationById);
router.patch('/admin/:id', authenticateUser, updateApplication);
router.delete('/admin/:id', authenticateUser, deleteApplication);
router.get('/admin/:id/cv', authenticateUser, downloadCV);

export default router;
