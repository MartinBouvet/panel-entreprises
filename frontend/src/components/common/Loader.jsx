// frontend/src/components/common/Loader.jsx
import React from 'react';

/**
 * Loader component for displaying loading states
 * @param {String} size - Loader size (sm, md, lg)
 * @param {String} message - Optional loading message
 * @param {Boolean} overlay - Whether to show a full-page overlay
 */
const Loader = ({ size = 'md', message, overlay = false }) => {
  // Determine size class
  let sizeClass;
  switch (size) {
    case 'sm':
      sizeClass = 'loader-sm';
      break;
    case 'lg':
      sizeClass = 'loader-lg';
      break;
    case 'md':
    default:
      sizeClass = 'loader-md';
      break;
  }
  
  // If overlay, render a full-page overlay
  if (overlay) {
    return (
      <div className="loader-overlay">
        <div className="loader-container">
          <div className={`loader ${sizeClass}`}></div>
          {message && <p className="loader-message">{message}</p>}
        </div>
      </div>
    );
  }
  
  // Otherwise, render a simple loader
  return (
    <div className="loader-container">
      <div className={`loader ${sizeClass}`}></div>
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;