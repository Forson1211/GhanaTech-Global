import app from './app';
import { connectDatabase } from './config/database';
import { env, validateProductionEnvironment } from './config/environment';

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
// In Vercel services mode, app middleware checks configuration and awaits the
// database per request, so startup errors return JSON and can be retried.
if (!process.env.VERCEL) {
  startServer();
}

export { app, startServer };
export default app;
