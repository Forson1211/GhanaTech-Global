// One Express API function alongside the static Vue application.
const { createApp } = require('../backend/dist/app');
const { connectDatabase } = require('../backend/dist/config/database');
const { validateProductionEnvironment } = require('../backend/dist/config/environment');

const app = createApp();

module.exports = async function handler(request, response) {
  try {
    validateProductionEnvironment();
    await connectDatabase();
  } catch (error) {
    console.error('[API Startup Error]:', error);
    response.statusCode = 503;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Cache-Control', 'no-store');
    response.end(JSON.stringify({
      success: false,
      message: 'The API is not ready. Check the database and server environment settings.',
    }));
    return;
  }
  app(request, response);
};
