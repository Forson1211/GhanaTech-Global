import { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { getDashboardSummary, getSiteSettings, updateSiteSettings } from '../controllers/statisticsController';

const router = Router();

// Require auth for all /api/admin/* routes
router.use(authenticateUser);

router.get('/dashboard-summary', getDashboardSummary);
router.get('/settings', getSiteSettings);
router.put('/settings', updateSiteSettings);

export default router;
