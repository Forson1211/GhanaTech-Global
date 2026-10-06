import { Request, Response } from 'express';
import {
  createCandidateSchema,
  updateCandidateSchema,
  updateStatusSchema,
} from '../validators/candidateValidator';
import * as candidateService from '../services/candidateService';
import { sendSuccess, sendError } from '../utils/response';

export async function getPublicCandidates(req: Request, res: Response): Promise<void> {
  try {
    const { search, category, role, skills, experience, availability, page, limit } = req.query;

    const result = await candidateService.getPublicCandidates({
      search: search as string,
      category: category as string,
      role: role as string,
      skills: skills as string,
      experience: experience as string,
      availability: availability as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 12,
    });

    sendSuccess(res, 'Candidates retrieved successfully', result);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve candidates', 500);
  }
}

export async function getPublicCandidateById(req: Request, res: Response): Promise<void> {
  try {
    const candidate = await candidateService.getPublicCandidateById(req.params.id);
    sendSuccess(res, 'Candidate retrieved successfully', candidate);
  } catch (error: any) {
    sendError(res, error.message || 'Candidate not found', 404);
  }
}

export async function getAdminCandidates(req: Request, res: Response): Promise<void> {
  try {
    const { search, category, role, skills, availability, profileStatus, page, limit } = req.query;

    const result = await candidateService.getAdminCandidates({
      search: search as string,
      category: category as string,
      role: role as string,
      skills: skills as string,
      availability: availability as string,
      profileStatus: profileStatus as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 15,
    });

    sendSuccess(res, 'Admin candidates retrieved successfully', result);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to retrieve candidates', 500);
  }
}

export async function getAdminCandidateById(req: Request, res: Response): Promise<void> {
  try {
    const candidate = await candidateService.getAdminCandidateById(req.params.id);
    sendSuccess(res, 'Candidate retrieved successfully', candidate);
  } catch (error: any) {
    sendError(res, error.message || 'Candidate not found', 404);
  }
}

export async function createCandidate(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = createCandidateSchema.parse(req.body);
    const newCandidate = await candidateService.createCandidate(validatedData);
    sendSuccess(res, 'Candidate created successfully', newCandidate, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create candidate', 400);
  }
}

export async function updateCandidate(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = updateCandidateSchema.parse(req.body);
    const updatedCandidate = await candidateService.updateCandidate(req.params.id, validatedData);
    sendSuccess(res, 'Candidate updated successfully', updatedCandidate);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update candidate', 400);
  }
}

export async function updateCandidateStatus(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = updateStatusSchema.parse(req.body);
    const updated = await candidateService.updateCandidateStatus(req.params.id, validatedData);
    sendSuccess(res, 'Candidate status updated successfully', updated);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update status', 400);
  }
}

export async function deleteCandidate(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await candidateService.deleteCandidate(req.params.id);
    sendSuccess(res, 'Candidate deleted successfully', { id: deleted._id });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete candidate', 400);
  }
}
