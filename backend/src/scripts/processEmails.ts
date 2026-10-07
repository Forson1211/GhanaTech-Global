import { connectDatabase } from '../config/database';
import { processEmailOutbox } from '../services/emailDelivery';
import mongoose from 'mongoose';
async function main() { try { await connectDatabase(); console.log(await processEmailOutbox(20)); } finally { await mongoose.disconnect(); } }
main().catch(() => { console.error('Email processing failed. Check the server configuration.'); process.exitCode = 1; });
