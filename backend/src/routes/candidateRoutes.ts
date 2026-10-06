import { Router } from 'express';
import {
  getPublicCandidates,
  getPublicCandidateById,
  getAdminCandidates,
  getAdminCandidateById,
  createCandidate,
  updateCandidate,
  updateCandidateStatus,
  deleteCandidate,
} from '../controllers/candidateController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

// Public routes (sanitized, approved candidates only)
router.get('/', getPublicCandidates);
router.get('/:id', getPublicCandidateById);

// Admin protected routes
router.get('/admin/all', authenticateUser, getAdminCandidates);
router.get('/admin/:id', authenticateUser, getAdminCandidateById);
router.post('/admin', authenticateUser, createCandidate);
router.put('/admin/:id', authenticateUser, updateCandidate);
router.patch('/admin/:id/status', authenticateUser, updateCandidateStatus);
router.delete('/admin/:id', authenticateUser, deleteCandidate);

export default router;
