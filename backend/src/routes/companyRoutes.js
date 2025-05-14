// backend/src/routes/companyRoutes.js
const express = require('express');
const companyController = require('../controllers/companyController');
const fileController = require('../controllers/fileController');

const router = express.Router();

/**
 * @route   GET /api/companies
 * @desc    Get all companies
 * @access  Private
 */
router.get('/', companyController.getAllCompanies);

/**
 * @route   POST /api/companies/import
 * @desc    Import companies from Excel
 * @access  Private
 */
router.post('/import', fileController.uploadMiddleware, companyController.importCompanies);

/**
 * @route   POST /api/companies/find-matching
 * @desc    Find companies matching criteria
 * @access  Private
 */
router.post('/find-matching', companyController.findMatchingCompanies);

module.exports = router;