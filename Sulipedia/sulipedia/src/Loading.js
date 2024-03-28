import React from 'react';
import './Loading.css'; // Import your CSS file

export function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
