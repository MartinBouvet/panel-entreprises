// frontend/src/services/fileService.js
import API from './api';

/**
 * Service for file-related operations
 */
const fileService = {
  /**
   * Upload a single file
   * @param {File} file - File to upload
   * @returns {Promise<Object>} - Uploaded file info
   */
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await API.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  
  /**
   * Upload multiple files
   * @param {Array<File>} files - Files to upload
   * @returns {Promise<Array>} - Uploaded files info
   */
  uploadMultipleFiles: async (files) => {
    try {
      const formData = new FormData();
      
      // Append all files to form data
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      
      const response = await API.post('/files/upload-multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  },
  
  /**
   * Parse document file to extract text
   * @param {File} file - Document file to parse
   * @returns {Promise<Object>} - Parsed document info with text content
   */
  parseDocument: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await API.post('/files/parse-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error parsing document:', error);
      throw error;
    }
  },
  
  /**
   * Get download URL for a file
   * @param {String} fileName - Name of the file to download
   * @returns {String} - Download URL
   */
  getFileDownloadUrl: (fileName) => {
    return `${API.defaults.baseURL}/files/download/${fileName}`;
  }
};

export default fileService;