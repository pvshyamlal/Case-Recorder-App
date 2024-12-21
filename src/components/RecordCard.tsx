import React from 'react';
import { format } from 'date-fns';
import { MedicalRecord } from '../types';

interface RecordCardProps {
  record: MedicalRecord;
  onClick: (record: MedicalRecord) => void;
}

export function RecordCard({ record, onClick }: RecordCardProps) {
  return (
    <div
      onClick={() => onClick(record)}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold">Case #{record.case_number}</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(record.date), 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      
      {record.description && (
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {record.description}
        </p>
      )}

      {record.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {record.images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden"
            >
              <img
                src={image}
                alt={`Record ${record.case_number} image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {record.images.length > 3 && (
            <div className="w-16 h-16 flex-shrink-0 rounded-md bg-gray-100 flex items-center justify-center text-sm text-gray-600">
              +{record.images.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
}