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
import rateLimit from 'express-rate-limit';
import { env } from '../config/environment';
import { prepareCvUpload, handleCvUpload } from '../controllers/cvUploadController';
import { sendSuccess } from '../utils/response';

const router = Router();
const uploadLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false });

router.get('/upload-config', (_req, res) => {
  sendSuccess(res, 'Document storage configuration.', { directUpload: env.CV_STORAGE === 'blob' });
});
router.post('/prepare-upload', uploadLimiter, prepareCvUpload);
router.post('/upload', handleCvUpload);

// Public route: submit talent application with optional CV upload
router.post('/', uploadCV.single('cv'), submitApplication);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminApplications);
router.get('/admin/:id', authenticateUser, getAdminApplicationById);
router.patch('/admin/:id', authenticateUser, updateApplication);
router.delete('/admin/:id', authenticateUser, deleteApplication);
router.get('/admin/:id/cv', authenticateUser, downloadCV);

export default router;
