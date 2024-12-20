import React, { useState } from 'react';
import './RecordForm.css';

const RecordForm = ({ onClose, onSave }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [caseNumber, setCaseNumber] = useState('');
  const [photo, setPhoto] = useState(null);

  // Handle photo upload and convert to base64
const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result); // Save as Base64 string
    reader.readAsDataURL(file);
  }
};


  // Validate form input
  const validateInput = () => {
    if (!caseNumber) {
      alert('Case number is required.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateInput()) return;

    const existingRecords = JSON.parse(localStorage.getItem('records')) || {};

    if (existingRecords[caseNumber]) {
      const confirmUpdate = window.confirm(
        'Record already exists. Do you want to add to the existing record?'
      );
      if (!confirmUpdate) return;
    }

    const newRecord = { date, photo };
    const updatedRecords = {
      ...existingRecords,
      [caseNumber]: [...(existingRecords[caseNumber] || []), newRecord],
    };

    // Save to localStorage
    localStorage.setItem('records', JSON.stringify(updatedRecords));

    // Trigger callback and close modal
    onSave();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Record</h2>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="caseNumber">Case Number:</label>
          <input
            type="text"
            id="caseNumber"
            placeholder="Enter case number"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Prescription Photo:</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="button-group">
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
