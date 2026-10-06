import { Request, Response } from 'express';
import { Service } from '../models/Service';
import { TechnologyCategory } from '../models/TechnologyCategory';
import { sendSuccess, sendError } from '../utils/response';

// --- Services ---

export async function getPublicServices(_req: Request, res: Response): Promise<void> {
  try {
    const services = await Service.find({ status: 'published' }).sort({ order: 1, createdAt: 1 }).lean();
    sendSuccess(res, 'Services retrieved successfully', services);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve services', 500);
  }
}

export async function getPublicServiceBySlug(req: Request, res: Response): Promise<void> {
  try {
    const service = await Service.findOne({ slug: req.params.slug, status: 'published' }).lean();
    if (!service) {
      sendError(res, 'Service not found', 404);
      return;
    }
    sendSuccess(res, 'Service retrieved successfully', service);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve service', 500);
  }
}

export async function getAdminServices(_req: Request, res: Response): Promise<void> {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
    sendSuccess(res, 'Admin services retrieved successfully', services);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve services', 500);
  }
}

export async function createService(req: Request, res: Response): Promise<void> {
  try {
    const { title, slug, description, capabilities, image, status, order } = req.body;
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const newService = new Service({
      title,
      slug: finalSlug,
      description,
      capabilities: Array.isArray(capabilities)
        ? capabilities
        : typeof capabilities === 'string'
        ? capabilities.split(',').map((c) => c.trim()).filter(Boolean)
        : [],
      image,
      status: status || 'published',
      order: order ? Number(order) : 0,
    });

    await newService.save();
    sendSuccess(res, 'Service created successfully', newService, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create service', 400);
  }
}

export async function updateService(req: Request, res: Response): Promise<void> {
  try {
    const { title, slug, description, capabilities, image, status, order } = req.body;
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (description !== undefined) updateData.description = description;
    if (capabilities !== undefined) {
      updateData.capabilities = Array.isArray(capabilities)
        ? capabilities
        : typeof capabilities === 'string'
        ? capabilities.split(',').map((c) => c.trim()).filter(Boolean)
        : [];
    }
    if (image !== undefined) updateData.image = image;
    if (status !== undefined) updateData.status = status;
    if (order !== undefined) updateData.order = Number(order);

    const service = await Service.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    if (!service) {
      sendError(res, 'Service not found', 404);
      return;
    }

    sendSuccess(res, 'Service updated successfully', service);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update service', 400);
  }
}

export async function deleteService(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Service not found', 404);
      return;
    }
    sendSuccess(res, 'Service deleted successfully', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete service', 400);
  }
}

// --- Technology Categories ---

export async function getCategories(_req: Request, res: Response): Promise<void> {
  try {
    const categories = await TechnologyCategory.find().sort({ order: 1, createdAt: 1 }).lean();
    sendSuccess(res, 'Categories retrieved successfully', categories);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve categories', 500);
  }
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  try {
    const { name, slug, description, icon, status, order } = req.body;
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const category = new TechnologyCategory({
      name,
      slug: finalSlug,
      description,
      icon,
      status: status || 'published',
      order: order ? Number(order) : 0,
    });

    await category.save();
    sendSuccess(res, 'Category created successfully', category, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create category', 400);
  }
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  try {
    const category = await TechnologyCategory.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!category) {
      sendError(res, 'Category not found', 404);
      return;
    }
    sendSuccess(res, 'Category updated successfully', category);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update category', 400);
  }
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await TechnologyCategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Category not found', 404);
      return;
    }
    sendSuccess(res, 'Category deleted successfully', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete category', 400);
  }
}
