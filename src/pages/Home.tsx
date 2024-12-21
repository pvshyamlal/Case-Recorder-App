import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { AddRecordButton } from '../components/AddRecordButton';
import { Modal } from '../components/ui/Modal';
import { AddRecordForm } from '../components/AddRecordForm';
import { RecordCard } from '../components/RecordCard';
import { searchRecords } from '../lib/api';
import { MedicalRecord } from '../types';

export function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRecords = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await searchRecords(filters);
      setRecords(data);
    } catch (error) {
      console.error('Failed to load records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleSearch = async (filters: { case_number?: string; start_date?: string; end_date?: string }) => {
    await loadRecords(filters);
  };

  const handleRecordClick = (record: MedicalRecord) => {
    // TODO: Implement record details view
    console.log('Record clicked:', record);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
                onClick={handleRecordClick}
              />
            ))}
            {records.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No records found
              </div>
            )}
          </div>
        )}

        <AddRecordButton onClick={() => setIsAddModalOpen(true)} />

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Record"
        >
          <AddRecordForm
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={() => loadRecords()}
          />
        </Modal>
      </div>
    </div>
  );
}