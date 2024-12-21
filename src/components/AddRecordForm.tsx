import React, { useState } from 'react';
import { format } from 'date-fns';
import { Camera, Upload } from 'lucide-react';
import { Button } from './ui/Button';
import { checkCaseNumberExists, createRecord, uploadImage } from '../lib/api';

interface AddRecordFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AddRecordForm({ onClose, onSuccess }: AddRecordFormProps) {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [caseNumber, setCaseNumber] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const exists = await checkCaseNumberExists(caseNumber);
      
      if (exists) {
        const confirmed = window.confirm(
          'Record already exists. Do you want to add data to the existing record?'
        );
        if (!confirmed) {
          setLoading(false);
          return;
        }
      }

      const uploadedImages = await Promise.all(
        images.map((file) => uploadImage(file))
      );

      await createRecord({
        case_number: caseNumber,
        date,
        description,
        images: uploadedImages,
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to save record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Case Number
        </label>
        <input
          type="text"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
          pattern="[0-9]{5}"
          title="Case number must be 5 digits"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              id="image-upload"
              multiple
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload
            </label>
          </div>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              className="hidden"
              id="camera-capture"
            />
            <label
              htmlFor="camera-capture"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              <Camera className="h-5 w-5 mr-2" />
              Camera
            </label>
          </div>
        </div>
        {images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((file, index) => (
              <div
                key={index}
                className="relative w-20 h-20 border rounded-md overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={loading}>
          Save Record
        </Button>
      </div>
    </form>
  );
}