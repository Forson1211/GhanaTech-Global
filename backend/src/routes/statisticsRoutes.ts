import { Router } from 'express';
import {
  getPublicStatistics,
  getAdminStatistics,
  updateStatistic,
  getDashboardSummary,
  getSiteSettings,
  updateSiteSettings,
} from '../controllers/statisticsController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', getPublicStatistics);
router.get('/settings', getSiteSettings);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminStatistics);
router.put('/admin/:id', authenticateUser, updateStatistic);
router.get('/admin/dashboard-summary', authenticateUser, getDashboardSummary);
router.put('/admin/settings', authenticateUser, updateSiteSettings);

export default router;
