import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { env } from './config/environment';
import { errorHandler } from './middleware/errorMiddleware';
import { sendError } from './utils/response';

// Import Route Handlers
import authRoutes from './routes/authRoutes';
import candidateRoutes from './routes/candidateRoutes';
import applicationRoutes from './routes/applicationRoutes';
import leadRoutes from './routes/leadRoutes';
import serviceRoutes from './routes/serviceRoutes';
import categoryRoutes from './routes/categoryRoutes';
import calculatorRoutes from './routes/calculatorRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import faqRoutes from './routes/faqRoutes';
import statisticsRoutes from './routes/statisticsRoutes';
import adminRoutes from './routes/adminRoutes';
import newsletterRoutes from './routes/newsletterRoutes';

export function createApp(): Application {
  const app: Application = express();

  // Trust proxy for rate limiting if behind reverse proxy
  app.set('trust proxy', 1);

  // Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allow inline styles / scripts if needed for client preview
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // CORS Configuration
  const allowedOrigins = [
    env.CLIENT_URL,
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:3000',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, true); // Allow all in dev for ease of local testing
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    })
  );

  // Global Rate Limiting (Section 48)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Allow 500 requests per 15 minutes per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again after 15 minutes.',
    },
  });
  app.use(limiter);

  // Parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Static directory for uploaded public images if any (CVs are served via protected download endpoint)
  app.use('/uploads/images', express.static(path.join(env.UPLOAD_DIR, 'images')));

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'GhanaTech Global Backend API is healthy and operational',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  });

  // Mount API Endpoints (Section 47)
  app.use('/api/auth', authRoutes);
  app.use('/api/candidates', candidateRoutes);
  app.use('/api/applications', applicationRoutes);
  app.use('/api/leads', leadRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/calculator', calculatorRoutes);
  app.use('/api/testimonials', testimonialRoutes);
  app.use('/api/faqs', faqRoutes);
  app.use('/api/statistics', statisticsRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/newsletter', newsletterRoutes);

  // 404 Handler for undefined API routes
  app.use((req: Request, res: Response) => {
    sendError(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
  });

  // Centralized Error Handling Middleware (Section 50)
  app.use(errorHandler);

  return app;
}
