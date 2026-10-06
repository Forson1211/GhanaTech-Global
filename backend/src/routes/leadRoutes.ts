import { Router } from 'express';
import {
  submitLead,
  getAdminLeads,
  getAdminLeadById,
  updateLead,
  deleteLead,
} from '../controllers/leadController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public route: submit company hiring request
router.post('/', submitLead);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminLeads);
router.get('/admin/:id', authenticateUser, getAdminLeadById);
router.patch('/admin/:id', authenticateUser, updateLead);
router.delete('/admin/:id', authenticateUser, deleteLead);

export default router;
