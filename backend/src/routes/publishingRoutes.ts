import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { JobPosting } from '../models/JobPosting';
import { SiteContent } from '../models/SiteContent';
import { jobSchema, contentSchema, publishedJobFilter } from '../validators/publishingValidator';
import { authenticateUser } from '../middleware/authMiddleware';
import { sendError, sendSuccess } from '../utils/response';

export const jobRoutes = Router();
export const contentRoutes = Router();
// Register the protected routes before public parameter routes.
function adminCrud(router: Router, model: mongoose.Model<any>, schema: z.ZodTypeAny) {
  router.get('/admin/all', authenticateUser, async (_req, res, next) => {
    try { sendSuccess(res, 'Records retrieved', await model.find().sort({ createdAt: -1 }).limit(500).lean()); } catch (error) { next(error); }
  });
  router.post('/admin', authenticateUser, async (req, res) => {
    try { sendSuccess(res, 'Record created', await model.create(schema.parse(req.body)), 201); }
    catch (error: any) { sendError(res, error.code === 11000 ? 'This content address is already in use.' : 'Check the publishing fields.', 400); }
  });
  router.put('/admin/:id', authenticateUser, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) { sendError(res, 'Invalid record ID', 400); return; }
    try {
      const record = await model.findByIdAndUpdate(req.params.id, { $set: schema.parse(req.body) }, { new: true, runValidators: true });
      if (!record) { sendError(res, 'Record not found', 404); return; }
      sendSuccess(res, 'Record updated', record);
    } catch (error: any) { sendError(res, error.code === 11000 ? 'This content address is already in use.' : 'Check the publishing fields.', 400); }
  });
  router.delete('/admin/:id', authenticateUser, async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) { sendError(res, 'Invalid record ID', 400); return; }
    try {
      const record = await model.findByIdAndDelete(req.params.id);
      if (!record) { sendError(res, 'Record not found', 404); return; }
      sendSuccess(res, 'Record deleted', { id: record._id });
    } catch (error) { next(error); }
  });
}
adminCrud(jobRoutes, JobPosting, jobSchema);
adminCrud(contentRoutes, SiteContent, contentSchema);
jobRoutes.get('/', async (_req, res, next) => {
  try { sendSuccess(res, 'Open opportunities', await JobPosting.find(publishedJobFilter()).sort({ createdAt: -1 }).limit(500).lean()); } catch (error) { next(error); }
});
contentRoutes.get('/:kind', async (req, res, next) => {
  if (!['leadership', 'insight', 'privacy', 'terms'].includes(req.params.kind)) { sendError(res, 'Content not found', 404); return; }
  try { sendSuccess(res, 'Published content', await SiteContent.find({ kind: req.params.kind, status: 'published' }).sort({ order: 1, createdAt: -1 }).limit(500).lean()); } catch (error) { next(error); }
});
