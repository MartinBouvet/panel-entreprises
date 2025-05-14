// backend/src/controllers/documentController.js
const documentService = require('../services/documentGenerationService');
const iaService = require('../services/iaService');
const excelService = require('../services/excelService');
const path = require('path');
const fs = require('fs');
const config = require('../config/env');
const logger = require('../utils/logger');

/**
 * Controller for document-related operations
 */
const documentController = {
  /**
   * Generate document based on template type and data
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async generateDocument(req, res) {
    try {
      const { templateType, projectData, companies, cahierDesCharges } = req.body;
      
      if (!templateType) {
        return res.status(400).json({
          success: false,
          message: 'Le type de document est requis'
        });
      }
      
      let documentFile;
      
      // Handle different document types
      if (templateType === 'grilleEvaluation') {
        // Generate evaluation grid Excel file
        const excelBuffer = excelService.generateEvaluationGrid(projectData, companies);
        
        // Save to file
        const fileName = `GrilleEvaluation_${Date.now()}.xlsx`;
        const filePath = path.join(process.cwd(), config.GENERATED_DOCS_DIR, fileName);
        
        // Ensure directory exists
        if (!fs.existsSync(path.dirname(filePath))) {
          fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        
        fs.writeFileSync(filePath, excelBuffer);
        
        documentFile = {
          fileName,
          filePath,
          url: `/api/documents/download/${fileName}`,
          type: 'xlsx'
        };
      } else {
        // Generate document content with AI
        const content = await iaService.generateDocument(templateType, {
          cahierDesCharges,
          companies,
          selectionCriteria: projectData.selectionCriteria,
          attributionCriteria: projectData.attributionCriteria,
          projectTitle: projectData.title || 'Projet EDF'
        });
        
        // Create actual file
        documentFile = await documentService.createDocumentFile(templateType, content, {
          projectId: projectData.id || Date.now().toString(),
          projectTitle: projectData.title || 'Projet EDF'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          fileUrl: documentFile.url,
          fileName: documentFile.fileName,
          type: documentFile.type
        }
      });
    } catch (error) {
      logger.error('Error generating document', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la génération du document',
        error: error.message
      });
    }
  },
  
  /**
   * Download a generated document
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async downloadDocument(req, res) {
    try {
      const { fileName } = req.params;
      
      if (!fileName) {
        return res.status(400).json({
          success: false,
          message: 'Le nom du fichier est requis'
        });
      }
      
      const filePath = path.join(process.cwd(), config.GENERATED_DOCS_DIR, fileName);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: 'Document non trouvé'
        });
      }
      
      // Determine content type
      let contentType = 'application/octet-stream';
      const extension = path.extname(fileName).toLowerCase();
      
      switch (extension) {
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
      logger.error('Error downloading document', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors du téléchargement du document',
        error: error.message
      });
    }
  },
  
  /**
   * Get list of available document templates
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getDocumentTemplates(req, res) {
    try {
      // In a real app, this might come from a database or scanned directory
      const templates = [
        {
          id: 'projetMarche',
          name: 'Projet de marché',
          description: 'Document type incluant les clauses administratives et techniques',
          icon: 'file-text',
          format: 'docx'
        },
        {
          id: 'reglementConsultation',
          name: 'Règlement de consultation',
          description: 'Document définissant les règles de la consultation',
          icon: 'clipboard',
          format: 'docx'
        },
        {
          id: 'grilleEvaluation',
          name: 'Grille d\'évaluation',
          description: 'Grille pré-remplie avec vos critères d\'attribution',
          icon: 'table',
          format: 'xlsx'
        },
        {
          id: 'lettreConsultation',
          name: 'Lettre de consultation',
          description: 'Lettre type pour inviter les entreprises à consulter',
          icon: 'mail',
          format: 'pdf'
        }
      ];
      
      return res.status(200).json({
        success: true,
        data: templates
      });
    } catch (error) {
      logger.error('Error getting document templates', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des modèles de documents',
        error: error.message
      });
    }
  }
};

module.exports = documentController;