import React from 'react';
import './RecordList.css';

const RecordList = ({ records, searchQuery }) => {
  const filteredRecords = Object.keys(records).filter((key) =>
    key.includes(searchQuery)
  );

  return (
    <div style={{ padding: '20px' }}>
      {filteredRecords.map((caseNumber) => (
        <div key={caseNumber}>
          <h3>Case Number: {caseNumber}</h3>
          {records[caseNumber].map((record, index) => (
            <div key={index}>
              <p>Date: {record.date}</p>
              <img
                src={record.photo}
                alt="Prescription"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RecordList;
