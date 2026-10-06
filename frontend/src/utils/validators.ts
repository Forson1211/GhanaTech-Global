/**
 * Email validation regex
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * URL validation regex
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Non-empty string validation
 */
export function isNotEmpty(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * File validation for PDF/DOCX CVs
 */
export function isValidCVFile(file: File): { valid: boolean; error?: string } {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const name = file.name.toLowerCase();
  const hasValidExt = allowedExtensions.some(ext => name.endsWith(ext));
  
  if (!hasValidExt) {
    return { valid: false, error: 'Only PDF or Word documents (.pdf, .doc, .docx) are allowed.' };
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'CV file size must be less than 10MB.' };
  }

  return { valid: true };
}
