import React, { useState, useEffect } from 'react';
import './App.css';
import AddRecordButton from './components/AddRecordButton';
import RecordForm from './components/RecordForm';
import SearchBar from './components/SearchBar';
import RecordList from './components/RecordList';

const App = () => {
  const [records, setRecords] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem('records')) || {};
    setRecords(savedRecords);
  }, []);

  const handleSave = () => {
    const savedRecords = JSON.parse(localStorage.getItem('records')) || {};
    setRecords(savedRecords);
  };

  return (
    <div className="container">
      <h1>Case Recorder</h1>
      {/* Conditionally render the SearchBar based on the isAdding state */}
      {!isAdding && <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      <RecordList records={records} searchQuery={searchQuery} />
      <AddRecordButton onClick={() => setIsAdding(true)} />
      {isAdding && (
        <RecordForm
          onClose={() => setIsAdding(false)} // Set isAdding to false when closing the form
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default App;
