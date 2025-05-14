// backend/src/routes/fileRoutes.js
const express = require('express');
const fileController = require('../controllers/fileController');
const multer = require('multer');
const config = require('../config/env');

const router = express.Router();

/**
 * Configure multer for multiple file uploads
 */
const multipleUpload = multer({
  dest: config.UPLOADS_DIR,
  limits: {
    fileSize: config.MAX_FILE_SIZE
  }
}).array('files', 10); // Allow up to 10 files

/**
 * @route   POST /api/files/upload
 * @desc    Upload a single file
 * @access  Private
 */
router.post('/upload', fileController.uploadMiddleware, (req, res) => {
  // fileController.uploadMiddleware adds req.file
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Aucun fichier fourni'
    });
  }
  
  return res.status(200).json({
    success: true,
    message: 'Fichier téléversé avec succès',
    data: {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/api/files/download/${req.file.filename}`
    }
  });
});

/**
 * @route   POST /api/files/upload-multiple
 * @desc    Upload multiple files
 * @access  Private
 */
router.post('/upload-multiple', (req, res) => {
  multipleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Erreur Multer: ${err.message}`
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: `Erreur lors du téléversement: ${err.message}`
      });
    }
    
    // Process uploaded files
    fileController.uploadFiles(req, res);
  });
});

/**
 * @route   POST /api/files/parse-document
 * @desc    Parse text from a document file
 * @access  Private
 */
router.post('/parse-document', fileController.uploadMiddleware, fileController.parseDocument);

/**
 * @route   GET /api/files/download/:fileName
 * @desc    Download a file
 * @access  Private
 */
router.get('/download/:fileName', fileController.downloadFile);

module.exports = router;