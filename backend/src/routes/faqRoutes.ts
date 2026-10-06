import { Router } from 'express';
import {
  getPublicFaqs,
  getAdminFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  reorderFaqs,
} from '../controllers/faqController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getPublicFaqs);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminFaqs);
router.post('/admin', authenticateUser, createFaq);
router.put('/admin/:id', authenticateUser, updateFaq);
router.post('/admin/reorder', authenticateUser, reorderFaqs);
router.delete('/admin/:id', authenticateUser, deleteFaq);

export default router;
