import { createApp } from './app';
import { connectDatabase } from './config/database';
import { env, validateProductionEnvironment } from './config/environment';

const app = createApp();

async function startServer(): Promise<void> {
  try {
    console.log('🚀 Starting GhanaTech Global API Server...');
    
    validateProductionEnvironment();
    // Connect to MongoDB
    await connectDatabase();

    const server = app.listen(env.PORT, () => {
      console.log(`\n======================================================`);
      console.log(` GhanaTech Global Backend API running successfully!`);
      console.log(` URL: http://localhost:${env.PORT}`);
      console.log(` Environment: ${env.NODE_ENV}`);
      console.log(` Health Check: http://localhost:${env.PORT}/api/health`);
      console.log(`======================================================\n`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('Fatal error during server startup:', error);
    process.exit(1);
  }
}

// In standalone / local mode, start the server listening on PORT.
// In Vercel serverless / services mode, ensure database is connected and export app.
if (!process.env.VERCEL) {
  startServer();
} else {
  validateProductionEnvironment();
  connectDatabase().catch((error) => {
    console.error('[Vercel Express] Database connection error:', error);
  });
}

export { app, startServer };
export default app;
