import { Request, Response } from 'express';
import { CalculatorConfig } from '../models/CalculatorConfig';
import { sendSuccess, sendError } from '../utils/response';
import { z } from 'zod';
const configSchema = z.object({ role: z.string().trim().min(2).max(200), seniority: z.enum(['Junior', 'Mid-Level', 'Senior']), usEstimatedAnnualCost: z.coerce.number().finite().positive(), ghanaTechEstimatedAnnualCost: z.coerce.number().finite().nonnegative(), notes: z.string().max(5000).optional() });

// Fallback baseline costs if specific role/seniority combo isn't customized yet
const DEFAULT_SENIORITY_MULTIPLIERS = {
  Junior: { us: 95000, ghanaTech: 32000 },
  'Mid-Level': { us: 145000, ghanaTech: 48000 },
  Senior: { us: 185000, ghanaTech: 64000 },
};

export async function getCalculatorConfigs(_req: Request, res: Response): Promise<void> {
  try {
    const configs = await CalculatorConfig.find().sort({ role: 1, seniority: 1 }).lean();
    sendSuccess(res, 'Calculator configs retrieved successfully', configs);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve calculator configs', 500);
  }
}

export async function calculateEstimate(req: Request, res: Response): Promise<void> {
  try {
    const parsed = z.object({ role: z.string().trim().min(2).max(200), seniority: z.enum(['Junior', 'Mid-Level', 'Senior']).default('Mid-Level'), count: z.coerce.number().finite().int().min(1).max(1000).default(1) }).safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 'Provide a role, valid seniority, and a whole-number headcount from 1 to 1000', 400);
      return;
    }
    const { role, seniority: validSeniority, count: numProfessionals } = parsed.data;

    // Find specific role + seniority config in DB
    const config = await CalculatorConfig.findOne({
      role: { $regex: new RegExp(`^${role.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
      seniority: validSeniority,
    }).lean();

    let unitUsCost = 145000;
    let unitGhanaTechCost = 48000;

    if (config) {
      unitUsCost = config.usEstimatedAnnualCost;
      unitGhanaTechCost = config.ghanaTechEstimatedAnnualCost;
    } else {
      // Use standard baseline for the requested seniority
      unitUsCost = DEFAULT_SENIORITY_MULTIPLIERS[validSeniority].us;
      unitGhanaTechCost = DEFAULT_SENIORITY_MULTIPLIERS[validSeniority].ghanaTech;
    }

    const estimatedUsCost = unitUsCost * numProfessionals;
    const estimatedGhanaTechCost = unitGhanaTechCost * numProfessionals;
    const estimatedAnnualDifference = estimatedUsCost - estimatedGhanaTechCost;
    const estimatedPercentageDifference = Math.round(((estimatedUsCost - estimatedGhanaTechCost) / estimatedUsCost) * 100);

    sendSuccess(res, 'Calculation completed successfully', {
      role,
      seniority: validSeniority,
      count: numProfessionals,
      unitUsCost,
      unitGhanaTechCost,
      estimatedUsCost,
      estimatedGhanaTechCost,
      estimatedAnnualDifference,
      estimatedPercentageDifference,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to perform calculation', 500);
  }
}

export async function saveCalculatorConfig(req: Request, res: Response): Promise<void> {
  try {
    const { role, seniority, usEstimatedAnnualCost, ghanaTechEstimatedAnnualCost, notes } = configSchema.parse(req.body);

    if (!role || !seniority || usEstimatedAnnualCost === undefined || ghanaTechEstimatedAnnualCost === undefined) {
      sendError(res, 'Role, seniority, and costs are required', 400);
      return;
    }

    const config = await CalculatorConfig.findOneAndUpdate(
      { role: role.trim(), seniority },
      {
        $set: {
          role: role.trim(),
          seniority,
          usEstimatedAnnualCost: Number(usEstimatedAnnualCost),
          ghanaTechEstimatedAnnualCost: Number(ghanaTechEstimatedAnnualCost),
          notes,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    sendSuccess(res, 'Calculator configuration saved successfully', config);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to save calculator configuration', 400);
  }
}

export async function deleteCalculatorConfig(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await CalculatorConfig.findByIdAndDelete(req.params.id);
    if (!deleted) {
      sendError(res, 'Config not found', 404);
      return;
    }
    sendSuccess(res, 'Calculator configuration deleted', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete calculator configuration', 400);
  }
}

export async function updateCalculatorConfig(req: Request, res: Response): Promise<void> {
  try {
    const data = configSchema.parse(req.body);
    const config = await CalculatorConfig.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, runValidators: true });
    if (!config) { sendError(res, 'Config not found', 404); return; }
    sendSuccess(res, 'Calculator configuration updated', config);
  } catch { sendError(res, 'Invalid calculator configuration', 400); }
}
