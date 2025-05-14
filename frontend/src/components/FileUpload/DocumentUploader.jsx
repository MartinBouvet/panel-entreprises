// frontend/src/components/FileUpload/DocumentUploader.jsx
import React, { useState, useRef } from 'react';
import { Upload, File } from 'lucide-react';
import FileDropzone from './FileDropzone';

const DocumentUploader = ({ onFileUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelected = async (file) => {
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(fileExtension)) {
      setUploadError('Format de fichier non supporté. Veuillez utiliser PDF ou DOCX.');
      return;
    }
    
    if (file.size > maxSize) {
      setUploadError('Fichier trop volumineux. La taille maximum est de 10MB.');
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      // Simulate uploading to server
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the parent component's handler
      onFileUpload(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Une erreur est survenue lors du téléversement. Veuillez réessayer.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="document-uploader">
      <FileDropzone
        onFileDrop={handleFileSelected}
        isUploading={isUploading}
        icon={<Upload size={40} />}
        message="Glissez-déposez votre fichier ici ou cliquez pour parcourir"
        subMessage="Formats supportés: .pdf, .docx (max 10MB)"
      />
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".pdf,.doc,.docx"
        onChange={(e) => handleFileSelected(e.target.files[0])}
      />
      
      {uploadError && (
        <div className="upload-error">
          <p>{uploadError}</p>
        </div>
      )}
      
      <div className="upload-actions">
        <button
          className="browse-button"
          onClick={handleBrowseClick}
          disabled={isUploading}
        >
          <File size={18} />
          Parcourir les fichiers
        </button>
      </div>
    </div>
  );
};

export default DocumentUploader;