import { Request, Response } from 'express';
import { FAQ } from '../models/FAQ';
import { sendSuccess, sendError } from '../utils/response';

export async function getPublicFaqs(_req: Request, res: Response): Promise<void> {
  try {
    const faqs = await FAQ.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).lean();
    sendSuccess(res, 'FAQs retrieved successfully', faqs);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve FAQs', 500);
  }
}

export async function getAdminFaqs(_req: Request, res: Response): Promise<void> {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 }).lean();
    sendSuccess(res, 'Admin FAQs retrieved successfully', faqs);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve FAQs', 500);
  }
}

export async function createFaq(req: Request, res: Response): Promise<void> {
  try {
    const { question, answer, category, order, isPublished } = req.body;
    const faq = new FAQ({
      question,
      answer,
      category: category || 'General',
      order: order !== undefined ? Number(order) : 0,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
    });
    await faq.save();
    sendSuccess(res, 'FAQ created successfully', faq, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create FAQ', 400);
  }
}

export async function updateFaq(req: Request, res: Response): Promise<void> {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!faq) {
      sendError(res, 'FAQ not found', 404);
      return;
    }
    sendSuccess(res, 'FAQ updated successfully', faq);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update FAQ', 400);
  }
}

export async function deleteFaq(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await FAQ.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'FAQ not found', 404);
      return;
    }
    sendSuccess(res, 'FAQ deleted successfully', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete FAQ', 400);
  }
}

export async function reorderFaqs(req: Request, res: Response): Promise<void> {
  try {
    const { items } = req.body; // array of { id, order }
    if (!Array.isArray(items)) {
      sendError(res, 'Invalid items array for reordering', 400);
      return;
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { order: item.order } },
      },
    }));

    await FAQ.bulkWrite(bulkOps);
    sendSuccess(res, 'FAQs reordered successfully');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to reorder FAQs', 400);
  }
}
