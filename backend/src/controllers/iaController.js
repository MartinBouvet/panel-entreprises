// backend/src/controllers/iaController.js
const iaService = require('../services/iaService');
const documentService = require('../services/documentGenerationService');
const logger = require('../utils/logger');

/**
 * Controller for AI-related operations
 */
const iaController = {
  /**
   * Analyze a document and extract keywords, criteria
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async analyzeDocument(req, res) {
    try {
      const { documentText } = req.body;
      
      if (!documentText) {
        return res.status(400).json({
          success: false,
          message: 'Le texte du document est requis'
        });
      }
      
      const analysisResults = await iaService.analyzeDocument(documentText);
      
      return res.status(200).json({
        success: true,
        data: analysisResults
      });
    } catch (error) {
      logger.error('Error in analyzeDocument controller', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'analyse du document',
        error: error.message
      });
    }
  },
  
  /**
   * Find matching companies based on criteria
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async findMatchingCompanies(req, res) {
    try {
      const { criteria, companies } = req.body;
      
      if (!criteria || !Array.isArray(criteria) || !companies || !Array.isArray(companies)) {
        return res.status(400).json({
          success: false,
          message: 'Les critères et les entreprises sont requis'
        });
      }
      
      const matchingCompanies = await iaService.findMatchingCompanies(companies, criteria);
      
      return res.status(200).json({
        success: true,
        data: matchingCompanies
      });
    } catch (error) {
      logger.error('Error in findMatchingCompanies controller', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la recherche d\'entreprises correspondantes',
        error: error.message
      });
    }
  },
  
  /**
   * Generate a document based on template and data
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async generateDocument(req, res) {
    try {
      const { templateType, data } = req.body;
      
      if (!templateType || !data) {
        return res.status(400).json({
          success: false,
          message: 'Le type de template et les données sont requis'
        });
      }
      
      // Generate document content with AI
      const documentContent = await iaService.generateDocument(templateType, data);
      
      // Create actual file
      const documentFile = await documentService.createDocumentFile(templateType, documentContent, data);
      
      return res.status(200).json({
        success: true,
        data: {
          content: documentContent,
          fileUrl: documentFile.url,
          fileName: documentFile.fileName
        }
      });
    } catch (error) {
      logger.error('Error in generateDocument controller', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la génération du document',
        error: error.message
      });
    }
  },
  
  /**
   * Extract keywords from text
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async extractKeywords(req, res) {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({
          success: false,
          message: 'Le texte est requis'
        });
      }
      
      // Use the IA service to analyze the document and extract just the keywords
      const analysisResults = await iaService.analyzeDocument(text);
      
      return res.status(200).json({
        success: true,
        data: analysisResults.keywords || []
      });
    } catch (error) {
      logger.error('Error in extractKeywords controller', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'extraction des mots-clés',
        error: error.message
      });
    }
  }
};

module.exports = iaController;