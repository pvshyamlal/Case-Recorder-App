import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/Button';

interface SearchBarProps {
  onSearch: (filters: { case_number?: string; start_date?: string; end_date?: string }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [caseNumber, setCaseNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      case_number: caseNumber || undefined,
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
          placeholder="Search by case number..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowDateFilter(!showDateFilter)}
        >
          {showDateFilter ? 'Hide' : 'Show'} Date Filter
        </Button>
        <Button type="submit" size="sm">
          Search
        </Button>
      </div>

      {showDateFilter && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
    </form>
  );
}