// frontend/src/hooks/useFileUpload.js
import { useState } from 'react';
import fileService from '../services/fileService';

/**
 * Custom hook for file upload functionality
 */
const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  /**
   * Handle file selection
   * @param {File} selectedFile - Selected file
   */
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setUploadSuccess(false);
    setUploadError(null);
    setFileContent(null);
  };
  
  /**
   * Upload file to server
   * @returns {Promise<Object|null>} - Uploaded file info or null if error
   */
  const uploadFile = async () => {
    if (!file) {
      setUploadError('Aucun fichier sélectionné');
      return null;
    }
    
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    
    try {
      const response = await fileService.uploadFile(file);
      setUploadSuccess(true);
      return response.data;
    } catch (error) {
      setUploadError(error.message || 'Erreur lors du téléversement du fichier');
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  /**
   * Parse document file to extract text
   * @returns {Promise<String|null>} - Extracted text or null if error
   */
  const parseDocument = async () => {
    if (!file) {
      setUploadError('Aucun fichier sélectionné');
      return null;
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      const response = await fileService.parseDocument(file);
      
      if (response.data && response.data.text) {
        setFileContent(response.data.text);
        return response.data.text;
      } else {
        throw new Error('Contenu du document non trouvé');
      }
    } catch (error) {
      setUploadError(error.message || 'Erreur lors de l\'analyse du document');
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  /**
   * Reset the upload state
   */
  const resetUpload = () => {
    setFile(null);
    setFileContent(null);
    setUploadError(null);
    setUploadSuccess(false);
    setIsUploading(false);
  };
  
  return {
    file,
    fileContent,
    isUploading,
    uploadError,
    uploadSuccess,
    handleFileSelect,
    uploadFile,
    parseDocument,
    resetUpload
  };
};

export default useFileUpload;