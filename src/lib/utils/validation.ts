export function validateImage(file: File): void {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Please upload an image.');
  }

  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('File size exceeds 10MB limit.');
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  const allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];
  
  if (!fileExt || !allowedTypes.includes(fileExt)) {
    throw new Error('Invalid file type. Allowed types: JPG, PNG, WebP');
  }
}