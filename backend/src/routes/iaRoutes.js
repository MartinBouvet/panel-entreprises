// backend/src/routes/iaRoutes.js
const express = require('express');
const iaController = require('../controllers/iaController');

const router = express.Router();

/**
 * @route   POST /api/ia/analyze-document
 * @desc    Analyze document and extract keywords, criteria
 * @access  Private
 */
router.post('/analyze-document', iaController.analyzeDocument);

/**
 * @route   POST /api/ia/find-matching-companies
 * @desc    Find matching companies based on criteria
 * @access  Private
 */
router.post('/find-matching-companies', iaController.findMatchingCompanies);

/**
 * @route   POST /api/ia/generate-document
 * @desc    Generate document based on template and data
 * @access  Private
 */
router.post('/generate-document', iaController.generateDocument);

/**
 * @route   POST /api/ia/extract-keywords
 * @desc    Extract keywords from text
 * @access  Private
 */
router.post('/extract-keywords', iaController.extractKeywords);

module.exports = router;