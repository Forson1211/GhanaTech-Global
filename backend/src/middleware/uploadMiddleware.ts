import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../config/environment';

const storage = env.CV_STORAGE === 'blob'
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (_req, _file, cb) => {
        const folder = path.join(env.UPLOAD_DIR, 'cvs');
        fs.mkdir(folder, { recursive: true }, (error) => cb(error, folder));
      },
      filename: (_req, file, cb) => {
        const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const base = path.basename(file.originalname, path.extname(file.originalname)).replace(/[^a-zA-Z0-9_-]/g, '_');
        cb(null, `${base}-${suffix}${path.extname(file.originalname).toLowerCase()}`);
      },
    });

export const uploadCV = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1, fields: 25 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const mime = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/octet-stream'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase()) && (!file.mimetype || mime.includes(file.mimetype))) cb(null, true);
    else cb(new Error('Only PDF, DOC and DOCX documents are accepted.'));
  },
});
