// backend/src/controllers/fileController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config/env');
const logger = require('../utils/logger');
const { PDFDocument } = require('pdf-lib');

/**
 * Multer storage configuration
 */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(process.cwd(), config.UPLOADS_DIR);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
  }
});

/**
 * File type filter
 */
const fileFilter = (req, file, cb) => {
  // Accept only certain file types
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.ms-excel',
    'text/plain'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporté. Formats acceptés: PDF, DOCX, DOC, XLSX, XLS, TXT'), false);
  }
};

/**
 * Multer upload middleware
 */
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.MAX_FILE_SIZE // Default: 10MB
  }
});

/**
 * Controller for file-related operations
 */
const fileController = {
  /**
   * Multer middleware for single file upload
   */
  uploadMiddleware: upload.single('file'),
  
  /**
   * Parse document text from various file formats
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async parseDocument(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Aucun fichier fourni'
        });
      }
      
      const file = req.file;
      const fileExt = path.extname(file.originalname).toLowerCase();
      
      let text = '';
      
      // Extract text based on file type
      if (fileExt === '.pdf') {
        text = await extractTextFromPDF(file.path);
      } else if (fileExt === '.docx' || fileExt === '.doc') {
        text = await extractTextFromDOCX(file.path);
      } else if (fileExt === '.txt') {
        text = fs.readFileSync(file.path, 'utf8');
      } else {
        // Handle other formats if needed
        return res.status(400).json({
          success: false,
          message: 'Format de fichier non supporté pour l\'extraction de texte'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          text: text
        }
      });
    } catch (error) {
      logger.error('Error parsing document', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'analyse du document',
        error: error.message
      });
    }
  },
  
  /**
   * Upload multiple files
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async uploadFiles(req, res) {
    try {
      // This route would use upload.array('files', 10) middleware
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Aucun fichier fourni'
        });
      }
      
      const filesInfo = req.files.map(file => ({
        originalName: file.originalname,
        fileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        url: `/api/files/download/${file.filename}`
      }));
      
      return res.status(200).json({
        success: true,
        message: `${filesInfo.length} fichiers téléversés avec succès`,
        data: filesInfo
      });
    } catch (error) {
      logger.error('Error uploading files', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors du téléversement des fichiers',
        error: error.message
      });
    }
  },
  
  /**
   * Download an uploaded file
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async downloadFile(req, res) {
    try {
      const { fileName } = req.params;
      
      if (!fileName) {
        return res.status(400).json({
          success: false,
          message: 'Le nom du fichier est requis'
        });
      }
      
      const filePath = path.join(process.cwd(), config.UPLOADS_DIR, fileName);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: 'Fichier non trouvé'
        });
      }
      
      // Determine content type based on file extension
      const ext = path.extname(fileName).toLowerCase();
      let contentType = 'application/octet-stream';
      
      switch (ext) {
        case '.pdf':
          contentType = 'application/pdf';
          break;
        case '.docx':
          contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case '.xlsx':
          contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        case '.txt':
          contentType = 'text/plain';
          break;
      }
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      logger.error('Error downloading file', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors du téléchargement du fichier',
        error: error.message
      });
    }
  }
};

/**
 * Extract text content from a PDF file
 * @param {String} filePath - Path to the PDF file
 * @returns {Promise<String>} - Extracted text
 */
async function extractTextFromPDF(filePath) {
  try {
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // This is just a placeholder - pdf-lib doesn't have text extraction capabilities
    // In a real app, you'd use a library like pdf-parse
    return `[Contenu extrait du PDF - ${pdfDoc.getPageCount()} pages]`;
  } catch (error) {
    logger.error('Error extracting text from PDF', error);
    throw new Error('Failed to extract text from PDF');
  }
}

/**
 * Extract text content from a DOCX file
 * @param {String} filePath - Path to the DOCX file
 * @returns {Promise<String>} - Extracted text
 */
async function extractTextFromDOCX(filePath) {
  try {
    // This is just a placeholder - in a real app, you'd use a library like mammoth.js
    return '[Contenu extrait du document DOCX]';
  } catch (error) {
    logger.error('Error extracting text from DOCX', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

module.exports = fileController;