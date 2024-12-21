export function handleError(context: string, error: unknown): void {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  console.error(`${context}:`, error);
  
  if (error instanceof Error && error.message.includes('row-level security policy')) {
    throw new Error('Permission denied. Please ensure you are logged in.');
  }
  
  throw error instanceof Error ? error : new Error(errorMessage);
}