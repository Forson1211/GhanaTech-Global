import { Router } from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/serviceController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getCategories);

// Admin protected routes
router.post('/admin', authenticateUser, createCategory);
router.put('/admin/:id', authenticateUser, updateCategory);
router.delete('/admin/:id', authenticateUser, deleteCategory);

export default router;
