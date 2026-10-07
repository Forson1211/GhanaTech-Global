import { Router } from 'express';
import {
  getCalculatorConfigs,
  calculateEstimate,
  saveCalculatorConfig,
  updateCalculatorConfig,
  deleteCalculatorConfig,
} from '../controllers/calculatorController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public calculator routes
router.get('/configs', getCalculatorConfigs);
router.post('/calculate', calculateEstimate);

// Admin protected routes
router.post('/admin/config', authenticateUser, saveCalculatorConfig);
router.put('/admin/config/:id', authenticateUser, updateCalculatorConfig);
router.delete('/admin/config/:id', authenticateUser, deleteCalculatorConfig);

export default router;
