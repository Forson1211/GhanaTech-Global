import { Response } from 'express';

export interface ApiResponsePayload<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: any;
  errors?: any;
}

export function sendSuccess<T = any>(
  res: Response,
  firstArg: string | T,
  secondArg?: any,
  statusCode = 200,
  meta?: any
): Response {
  let message = 'Request successful';
  let data: any = undefined;

  if (typeof firstArg === 'string') {
    message = firstArg;
    data = secondArg;
  } else {
    data = firstArg;
    if (typeof secondArg === 'string') {
      message = secondArg;
    }
  }

  const payload: ApiResponsePayload<T> = {
    success: true,
    message,
    data,
  };
  if (meta !== undefined) {
    payload.meta = meta;
  }
  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  message = 'An error occurred',
  statusCode = 500,
  errors?: any
): Response {
  const payload: ApiResponsePayload = {
    success: false,
    message,
  };
  if (errors !== undefined) {
    payload.errors = errors;
  }
  return res.status(statusCode).json(payload);
}
