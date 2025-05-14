// backend/src/controllers/companyController.js
const excelService = require('../services/excelService');
const companyMatcher = require('../utils/companyMatcher');
const iaService = require('../services/iaService');
const logger = require('../utils/logger');

/**
 * Controller for company-related operations
 */
const companyController = {
  /**
   * Import companies from Excel file
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async importCompanies(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Aucun fichier Excel fourni'
        });
      }
      
      const companies = excelService.parseCompaniesExcel(req.file.buffer);
      
      return res.status(200).json({
        success: true,
        message: `${companies.length} entreprises importées avec succès`,
        data: companies
      });
    } catch (error) {
      logger.error('Error importing companies from Excel', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'importation des entreprises',
        error: error.message
      });
    }
  },
  
  /**
   * Find matching companies based on selection criteria
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async findMatchingCompanies(req, res) {
    try {
      const { companies, criteria, useAI = true } = req.body;
      
      if (!companies || !Array.isArray(companies) || companies.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'La liste des entreprises est requise'
        });
      }
      
      if (!criteria || !Array.isArray(criteria)) {
        return res.status(400).json({
          success: false,
          message: 'Les critères de sélection sont requis'
        });
      }
      
      let matchedCompanies;
      
      // Try using AI service if requested
      if (useAI) {
        try {
          matchedCompanies = await iaService.findMatchingCompanies(companies, criteria);
        } catch (aiError) {
          logger.error('Error using AI for company matching, falling back to local matching', aiError);
          matchedCompanies = companyMatcher.matchCompanies(companies, criteria);
        }
      } else {
        // Use local matcher
        matchedCompanies = companyMatcher.matchCompanies(companies, criteria);
      }
      
      // Sort by score (highest first)
      matchedCompanies.sort((a, b) => b.score - a.score);
      
      return res.status(200).json({
        success: true,
        data: matchedCompanies
      });
    } catch (error) {
      logger.error('Error finding matching companies', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la recherche d\'entreprises correspondantes',
        error: error.message
      });
    }
  },
  
  /**
   * Get list of all companies
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllCompanies(req, res) {
    try {
      // In a real application, this would fetch from database
      // For now, returning a mock response
      return res.status(200).json({
        success: true,
        message: 'Mock companies list',
        data: [
          {
            id: 'E1',
            name: 'ElectroTech Solutions',
            location: 'Paris (75)',
            experience: '5 projets similaires',
            certifications: ['MASE', 'ISO 9001'],
            ca: '12M€',
            employees: '85'
          },
          {
            id: 'E2',
            name: 'PowerGrid France',
            location: 'Versailles (78)',
            experience: '4 projets similaires',
            certifications: ['MASE'],
            ca: '8M€',
            employees: '60'
          },
          {
            id: 'E3',
            name: 'HT Electric',
            location: 'Nanterre (92)',
            experience: '6 projets similaires',
            certifications: ['MASE', 'ISO 14001'],
            ca: '15M€',
            employees: '120'
          },
          {
            id: 'E4',
            name: 'Méca Industrie',
            location: 'Lyon (69)',
            experience: '3 projets similaires',
            certifications: ['ISO 9001'],
            ca: '5M€',
            employees: '45'
          }
        ]
      });
    } catch (error) {
      logger.error('Error getting all companies', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des entreprises',
        error: error.message
      });
    }
  }
};

module.exports = companyController;