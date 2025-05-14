// backend/src/routes/documentRoutes.js
const express = require('express');
const documentController = require('../controllers/documentController');

const router = express.Router();

/**
 * @route   GET /api/documents/templates
 * @desc    Get list of document templates
 * @access  Private
 */
router.get('/templates', documentController.getDocumentTemplates);

/**
 * @route   POST /api/documents/generate
 * @desc    Generate document from template
 * @access  Private
 */
router.post('/generate', documentController.generateDocument);

/**
 * @route   GET /api/documents/download/:fileName
 * @desc    Download a generated document
 * @access  Private
 */
router.get('/download/:fileName', documentController.downloadDocument);

module.exports = router;