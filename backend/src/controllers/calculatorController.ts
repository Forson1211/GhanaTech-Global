import { Request, Response } from 'express';
import { CalculatorConfig } from '../models/CalculatorConfig';
import { sendSuccess, sendError } from '../utils/response';

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
    const { role, seniority = 'Mid-Level', count = 1 } = req.body;

    if (!role) {
      sendError(res, 'Role is required for calculation', 400);
      return;
    }

    const numProfessionals = Math.max(1, Number(count) || 1);
    const validSeniority = (['Junior', 'Mid-Level', 'Senior'].includes(seniority) ? seniority : 'Mid-Level') as
      | 'Junior'
      | 'Mid-Level'
      | 'Senior';

    // Find specific role + seniority config in DB
    const config = await CalculatorConfig.findOne({
      role: { $regex: new RegExp(`^${role.trim()}$`, 'i') },
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
    const { role, seniority, usEstimatedAnnualCost, ghanaTechEstimatedAnnualCost, notes } = req.body;

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
