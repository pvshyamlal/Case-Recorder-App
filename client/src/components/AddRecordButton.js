import React from 'react';
import './AddRecordButton.css';

const AddRecordButton = ({ onClick }) => {
  return (
    <button
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#007BFF',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontSize: '24px',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      +
    </button>
  );
};

export default AddRecordButton;
