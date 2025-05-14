// frontend/src/services/documentService.js
import API from './api';

/**
 * Service for document-related operations
 */
const documentService = {
  /**
   * Get available document templates
   * @returns {Promise<Array>} - List of document templates
   */
  getDocumentTemplates: async () => {
    try {
      const response = await API.get('/documents/templates');
      return response.data;
    } catch (error) {
      console.error('Error getting document templates:', error);
      throw error;
    }
  },
  
  /**
   * Generate a document
   * @param {String} templateType - Type of document to generate
   * @param {Object} projectData - Project data (criteria, title, etc.)
   * @param {Array} companies - Selected companies
   * @param {String} cahierDesCharges - Cahier des charges text
   * @returns {Promise<Object>} - Generated document info
   */
  generateDocument: async (templateType, projectData, companies, cahierDesCharges) => {
    try {
      const response = await API.post('/documents/generate', {
        templateType,
        projectData,
        companies,
        cahierDesCharges
      });
      
      return response.data;
    } catch (error) {
      console.error('Error generating document:', error);
      throw error;
    }
  },
  
  /**
   * Get download URL for a document
   * @param {String} fileName - Name of the file to download
   * @returns {String} - Download URL
   */
  getDocumentDownloadUrl: (fileName) => {
    return `${API.defaults.baseURL}/documents/download/${fileName}`;
  }
};

export default documentService;