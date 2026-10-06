import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../config/environment';

// Ensure upload directory exists
const cvUploadDir = path.join(env.UPLOAD_DIR, 'cvs');
if (!fs.existsSync(cvUploadDir)) {
  fs.mkdirSync(cvUploadDir, { recursive: true });
}

// Storage abstraction (Disk storage provider, can be swapped for S3 / Cloud Storage)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, cvUploadDir);
  },
  filename: (_req, file, cb) => {
    // Sanitize filename and create unique timestamped key
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const sanitizedBase = path.basename(file.originalname, path.extname(file.originalname)).replace(/[^a-zA-Z0-9_-]/g, '_');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  },
});

// File filter validation
const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream', // Some browsers report docx as octet-stream
  ];

  if (allowedExtensions.includes(ext) || allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are accepted.'));
  }
};

export const uploadCV = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit as per Section 49
  },
  fileFilter,
});
