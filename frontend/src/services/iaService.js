// frontend/src/services/iaService.js
import API from './api';

/**
 * Service for interacting with AI endpoints
 */
const iaService = {
  /**
   * Analyze a document and extract keywords, criteria
   * @param {String} documentText - Document text content
   * @returns {Promise<Object>} - Analysis results (keywords, selectionCriteria, attributionCriteria)
   */
  analyzeDocument: async (documentText) => {
    try {
      const response = await API.post('/ia/analyze-document', { documentText });
      return response.data;
    } catch (error) {
      console.error('Error analyzing document:', error);
      throw error;
    }
  },
  
  /**
   * Extract keywords from text
   * @param {String} text - Text to analyze
   * @returns {Promise<Array>} - Extracted keywords
   */
  extractKeywords: async (text) => {
    try {
      const response = await API.post('/ia/extract-keywords', { text });
      return response.data;
    } catch (error) {
      console.error('Error extracting keywords:', error);
      throw error;
    }
  },
  
  /**
   * Find matching companies based on criteria
   * @param {Array} companies - List of companies
   * @param {Array} criteria - Selection criteria
   * @param {Boolean} useAI - Whether to use AI for matching
   * @returns {Promise<Array>} - List of matching companies with scores
   */
  findMatchingCompanies: async (companies, criteria, useAI = true) => {
    try {
      const response = await API.post('/ia/find-matching-companies', { 
        companies, 
        criteria,
        useAI
      });
      return response.data;
    } catch (error) {
      console.error('Error finding matching companies:', error);
      throw error;
    }
  },
  
  /**
   * Generate a document based on template and data
   * @param {String} templateType - Type of document to generate
   * @param {Object} data - Data for document generation
   * @returns {Promise<Object>} - Generated document info
   */
  generateDocument: async (templateType, data) => {
    try {
      const response = await API.post('/ia/generate-document', { 
        templateType, 
        data
      });
      return response.data;
    } catch (error) {
      console.error('Error generating document:', error);
      throw error;
    }
  }
};

export default iaService;