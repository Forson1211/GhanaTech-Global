import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';
import { sendSuccess, sendError } from '../utils/response';

export async function getPublicTestimonials(_req: Request, res: Response): Promise<void> {
  try {
    const testimonials = await Testimonial.find({ status: 'published' }).sort({ order: 1, createdAt: -1 }).lean();
    sendSuccess(res, 'Testimonials retrieved successfully', testimonials);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve testimonials', 500);
  }
}

export async function getAdminTestimonials(_req: Request, res: Response): Promise<void> {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();
    sendSuccess(res, 'Admin testimonials retrieved successfully', testimonials);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve testimonials', 500);
  }
}

export async function createTestimonial(req: Request, res: Response): Promise<void> {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    sendSuccess(res, 'Testimonial created successfully', testimonial, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create testimonial', 400);
  }
}

export async function updateTestimonial(req: Request, res: Response): Promise<void> {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!testimonial) {
      sendError(res, 'Testimonial not found', 404);
      return;
    }
    sendSuccess(res, 'Testimonial updated successfully', testimonial);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update testimonial', 400);
  }
}

export async function deleteTestimonial(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Testimonial not found', 404);
      return;
    }
    sendSuccess(res, 'Testimonial deleted successfully', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete testimonial', 400);
  }
}
