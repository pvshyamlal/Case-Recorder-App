import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by case number..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        margin: '20px',
        padding: '10px',
        width: 'calc(100% - 40px)',
        fontSize: '16px',
      }}
    />
  );
};

export default SearchBar;
