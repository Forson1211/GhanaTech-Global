import { Router } from 'express';
import {
  getPublicTestimonials,
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getPublicTestimonials);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminTestimonials);
router.post('/admin', authenticateUser, createTestimonial);
router.put('/admin/:id', authenticateUser, updateTestimonial);
router.delete('/admin/:id', authenticateUser, deleteTestimonial);

export default router;
