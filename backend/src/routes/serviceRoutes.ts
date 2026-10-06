import { Router } from 'express';
import {
  getPublicServices,
  getPublicServiceBySlug,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getPublicServices);
router.get('/:slug', getPublicServiceBySlug);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminServices);
router.post('/admin', authenticateUser, createService);
router.put('/admin/:id', authenticateUser, updateService);
router.delete('/admin/:id', authenticateUser, deleteService);

export default router;
