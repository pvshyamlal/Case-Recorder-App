export function generateFileName(file: File): string {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}.${fileExt}`;
}