// frontend/src/services/companyService.js
import API from './api';

/**
 * Service for company-related operations
 */
const companyService = {
  /**
   * Get all companies
   * @returns {Promise<Array>} - List of all companies
   */
  getAllCompanies: async () => {
    try {
      const response = await API.get('/companies');
      return response.data;
    } catch (error) {
      console.error('Error getting companies:', error);
      throw error;
    }
  },
  
  /**
   * Import companies from Excel file
   * @param {File} file - Excel file
   * @returns {Promise<Object>} - Import results
   */
  importCompanies: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Need to override headers for file upload
      const response = await API.post('/companies/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error importing companies:', error);
      throw error;
    }
  },
  
  /**
   * Find companies matching criteria
   * @param {Array} companies - List of companies to filter
   * @param {Array} criteria - Selection criteria
   * @returns {Promise<Array>} - Matching companies with scores
   */
  findMatchingCompanies: async (companies, criteria) => {
    try {
      const response = await API.post('/companies/find-matching', { 
        companies, 
        criteria 
      });
      return response.data;
    } catch (error) {
      console.error('Error finding matching companies:', error);
      throw error;
    }
  }
};

export default companyService;