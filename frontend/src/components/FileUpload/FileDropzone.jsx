// frontend/src/components/FileUpload/FileDropzone.jsx
import React, { useState, useRef } from 'react';
import { Loader } from 'lucide-react';

const FileDropzone = ({ onFileDrop, isUploading, icon, message, subMessage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dropzoneRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    // Trigger file select dialog from parent component
    if (dropzoneRef.current) {
      dropzoneRef.current.click();
    }
  };

  return (
    <div
      ref={dropzoneRef}
      className={`file-dropzone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <div className="dropzone-content">
        {isUploading ? (
          <div className="uploading-indicator">
            <Loader size={40} className="spin" />
            <p>Traitement en cours...</p>
          </div>
        ) : (
          <>
            <div className="dropzone-icon">{icon}</div>
            <p className="dropzone-message">{message}</p>
            <p className="dropzone-submessage">{subMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileDropzone;