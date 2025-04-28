import React, { useState, useRef } from 'react';
import FileDragDrop from './FileDragDrop';
import Button from '../common/Button';

const FileUploader = ({
  onFileSelect,
  acceptedFileTypes = '.pdf,.doc,.docx',
  maxFileSize = 10, // En MB
  label = 'Téléverser votre fichier',
  description = 'Glissez-déposez votre fichier ici ou cliquez pour parcourir',
  maxFiles = 1,
  showPreview = true,
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Valider le type de fichier
    const fileType = file.name.split('.').pop().toLowerCase();
    const acceptedTypes = acceptedFileTypes
      .split(',')
      .map((type) => type.trim().replace('.', '').toLowerCase());
    
    if (!acceptedTypes.includes(fileType)) {
      setError(`Type de fichier non accepté. Formats acceptés: ${acceptedFileTypes}`);
      return false;
    }

    // Valider la taille du fichier
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`Taille de fichier trop grande. Maximum: ${maxFileSize}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (selectedFiles) => {
    setError(null);

    if (selectedFiles.length > maxFiles) {
      setError(`Vous ne pouvez téléverser que ${maxFiles} fichier(s) à la fois.`);
      return;
    }

    const validFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (validateFile(file)) {
        validFiles.push(file);
      } else {
        // Si un fichier est invalide, on arrête le traitement
        return;
      }
    }

    setFiles(validFiles);
    if (validFiles.length > 0 && onFileSelect) {
      onFileSelect(maxFiles === 1 ? validFiles[0] : validFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    handleFileSelect(Array.from(e.target.files));
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (newFiles.length > 0 && onFileSelect) {
      onFileSelect(maxFiles === 1 ? newFiles[0] : newFiles);
    } else {
      onFileSelect(null);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept={acceptedFileTypes}
        multiple={maxFiles > 1}
        className="hidden"
      />

      {files.length === 0 ? (
        <>
          <FileDragDrop
            onFileSelect={handleFileSelect}
            onClick={handleClick}
            label={label}
            description={description}
          />
          <div className="mt-2 text-sm text-gray-500">
            Formats supportés: {acceptedFileTypes} (max {maxFileSize}MB)
          </div>
        </>
      ) : (
        showPreview && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Fichier(s) sélectionné(s)</h4>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Button
                variant="secondary"
                onClick={handleClick}
                className="text-sm"
              >
                Changer de fichier
              </Button>
            </div>
          </div>
        )
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUploader;