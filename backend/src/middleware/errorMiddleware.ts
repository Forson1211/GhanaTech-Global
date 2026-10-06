import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { ZodError } from 'zod';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[Error caught by centralized error middleware]:', err.message || err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    const errorMessages = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    sendError(res, 'Validation failed for one or more fields.', 400, errorMessages);
    return;
  }

  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      sendError(res, 'Uploaded file exceeds the maximum allowed size (10MB).', 400);
      return;
    }
    sendError(res, `File upload error: ${err.message}`, 400);
    return;
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    sendError(res, `A record with this ${field} already exists.`, 409);
    return;
  }

  // Default server error - NEVER expose stack traces to users (Section 50)
  const statusCode = err.statusCode || 500;
  const userMessage = err.isOperational
    ? err.message
    : 'An unexpected internal server error occurred. Please try again later.';

  sendError(res, userMessage, statusCode);
}
