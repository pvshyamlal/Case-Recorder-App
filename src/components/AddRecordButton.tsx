import React from 'react';
import { Plus } from 'lucide-react';

interface AddRecordButtonProps {
  onClick: () => void;
}

export function AddRecordButton({ onClick }: AddRecordButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Plus size={24} />
    </button>
  );
}