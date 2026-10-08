import mongoose from 'mongoose';
import { env, validateProductionEnvironment } from '../config/environment';
import { connectDatabase, disconnectDatabase } from '../config/database';
import '../models/User';
import '../models/Candidate';
import '../models/CalculatorConfig';
import '../models/CompanyLead';
import '../models/EmailNotification';
import '../models/FAQ';
import '../models/JobPosting';
import '../models/LoginActivity';
import '../models/NewsletterSubscriber';
import '../models/Service';
import '../models/SiteContent';
import '../models/SiteSettings';
import '../models/Statistic';
import '../models/TalentApplication';
import '../models/TechnologyCategory';
import '../models/Testimonial';

async function initializeDatabase() {
  if (!env.isProduction) throw new Error('Configure the production environment before initialization.');
  validateProductionEnvironment();
  await connectDatabase();
  // Add declared indexes; never use syncIndexes(), which can remove indexes.
  for (const model of Object.values(mongoose.models)) {
    await model.createIndexes();
    console.log('Indexes ready: ' + model.modelName);
  }
  console.log('Database indexes initialized. No demo records or accounts were created.');
}
initializeDatabase().catch(() => {
  console.error('Database initialization failed. Check credentials, access, and existing duplicate records. Secret values omitted.');
  process.exitCode = 1;
}).finally(disconnectDatabase);
