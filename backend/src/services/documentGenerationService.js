// backend/src/services/documentGenerationService.js
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const docx = require('docx');
const config = require('../config/env');
const logger = require('../utils/logger');

/**
 * Service for generating document files based on content
 */
class DocumentGenerationService {
  /**
   * Create a document file based on template type and content
   * @param {String} templateType - Type of document (projetMarche, reglementConsultation, etc.)
   * @param {String} content - Document content
   * @param {Object} data - Additional data for document generation
   * @returns {Object} - Information about the generated file
   */
  async createDocumentFile(templateType, content, data) {
    try {
      const fileName = this._generateFileName(templateType, data);
      const outputDir = path.join(process.cwd(), config.GENERATED_DOCS_DIR);
      
      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      let fileExtension;
      let filePath;
      
      // Generate appropriate file type based on template
      if (templateType === 'grilleEvaluation') {
        fileExtension = 'xlsx';
        // This would be handled by excelService, returning a placeholder here
        filePath = path.join(outputDir, `${fileName}.${fileExtension}`);
        // Create an empty file as placeholder
        fs.writeFileSync(filePath, '');
      } else {
        // For text-based documents, generate Word or PDF
        if (templateType === 'projetMarche' || templateType === 'reglementConsultation') {
          fileExtension = 'docx';
          filePath = path.join(outputDir, `${fileName}.${fileExtension}`);
          await this._generateWordDocument(content, filePath, templateType, data);
        } else {
          fileExtension = 'pdf';
          filePath = path.join(outputDir, `${fileName}.${fileExtension}`);
          await this._generatePDFDocument(content, filePath, templateType, data);
        }
      }
      
      logger.info(`Document ${templateType} generated at: ${filePath}`);
      
      return {
        fileName: `${fileName}.${fileExtension}`,
        filePath,
        url: `/api/documents/download/${fileName}.${fileExtension}`,
        type: fileExtension
      };
    } catch (error) {
      logger.error(`Error creating document file for ${templateType}`, error);
      throw new Error(`Failed to create document file: ${error.message}`);
    }
  }
  
  /**
   * Generate a Word document
   * @param {String} content - Document content
   * @param {String} outputPath - Path to save the file
   * @param {String} templateType - Type of document 
   * @param {Object} data - Additional data
   * @private
   */
  async _generateWordDocument(content, outputPath, templateType, data) {
    try {
      // Parse sections from content
      const sections = this._parseContentSections(content);
      
      // Create sections for the Word document
      const docSections = [];
      
      // Add title
      const titleText = templateType === 'projetMarche' 
        ? 'PROJET DE MARCHÉ' 
        : 'RÈGLEMENT DE CONSULTATION';
      
      docSections.push(
        new docx.Paragraph({
          text: titleText,
          heading: docx.HeadingLevel.HEADING_1,
          alignment: docx.AlignmentType.CENTER,
          spacing: { before: 200, after: 200 }
        })
      );
      
      // Add project info if available
      if (data && data.projectTitle) {
        docSections.push(
          new docx.Paragraph({
            text: `Projet: ${data.projectTitle}`,
            heading: docx.HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 }
          })
        );
      }
      
      // Add document creation date
      docSections.push(
        new docx.Paragraph({
          text: `Date: ${new Date().toLocaleDateString('fr-FR')}`,
          spacing: { before: 100, after: 200 }
        })
      );
      
      // Add content sections
      for (const section of sections) {
        // Add section title if it exists
        if (section.title) {
          docSections.push(
            new docx.Paragraph({
              text: section.title,
              heading: docx.HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 100 }
            })
          );
        }
        
        // Add section content paragraphs
        const paragraphs = section.content.split('\n\n');
        for (const paragraph of paragraphs) {
          if (paragraph.trim()) {
            docSections.push(
              new docx.Paragraph({
                text: paragraph.trim(),
                spacing: { before: 100, after: 100 }
              })
            );
          }
        }
      }
      
      // Create the document
      const doc = new docx.Document({
        sections: [
          {
            properties: {},
            children: docSections
          }
        ]
      });
      
      // Save the document
      const buffer = await docx.Packer.toBuffer(doc);
      fs.writeFileSync(outputPath, buffer);
    } catch (error) {
      logger.error('Error generating Word document', error);
      throw new Error('Failed to generate Word document');
    }
  }
  
  /**
   * Generate a PDF document
   * @param {String} content - Document content
   * @param {String} outputPath - Path to save the file
   * @param {String} templateType - Type of document
   * @param {Object} data - Additional data
   * @private
   */
  async _generatePDFDocument(content, outputPath, templateType, data) {
    try {
      // Parse sections from content
      const sections = this._parseContentSections(content);
      
      // Create a new PDF document
      const doc = new PDFDocument({ 
        margins: { top: 50, bottom: 50, left: 50, right: 50 } 
      });
      
      // Pipe output to the file
      doc.pipe(fs.createWriteStream(outputPath));
      
      // Add title
      const titleText = templateType === 'lettreConsultation' 
        ? 'LETTRE DE CONSULTATION' 
        : 'DOCUMENT';
      
      doc.fontSize(18)
         .font('Helvetica-Bold')
         .text(titleText, { align: 'center' });
      
      doc.moveDown(2);
      
      // Add project info if available
      if (data && data.projectTitle) {
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .text(`Projet: ${data.projectTitle}`);
           
        doc.moveDown();
      }
      
      // Add document creation date
      doc.fontSize(12)
         .font('Helvetica')
         .text(`Date: ${new Date().toLocaleDateString('fr-FR')}`);
         
      doc.moveDown(2);
      
      // Add content sections
      for (const section of sections) {
        // Add section title if it exists
        if (section.title) {
          doc.fontSize(14)
             .font('Helvetica-Bold')
             .text(section.title);
             
          doc.moveDown();
        }
        
        // Add section content paragraphs
        const paragraphs = section.content.split('\n\n');
        for (const paragraph of paragraphs) {
          if (paragraph.trim()) {
            doc.fontSize(12)
               .font('Helvetica')
               .text(paragraph.trim());
               
            doc.moveDown();
          }
        }
      }
      
      // Finalize the PDF
      doc.end();
    } catch (error) {
      logger.error('Error generating PDF document', error);
      throw new Error('Failed to generate PDF document');
    }
  }
  
  /**
   * Parse content into sections
   * @param {String} content - Raw content
   * @returns {Array} - Array of section objects with title and content
   * @private
   */
  _parseContentSections(content) {
    try {
      const sections = [];
      const lines = content.split('\n');
      
      let currentSection = { title: '', content: '' };
      
      for (const line of lines) {
        // Check if line is a section title (all caps or starts with number)
        const isSectionTitle = line.trim() === line.toUpperCase() || /^\d+[\.\)]\s+[A-Z]/.test(line);
        
        if (isSectionTitle && line.trim().length > 0) {
          // Save previous section if it has content
          if (currentSection.content.trim()) {
            sections.push({ ...currentSection });
          }
          
          // Start new section
          currentSection = { title: line.trim(), content: '' };
        } else {
          // Add to current section
          if (line.trim()) {
            currentSection.content += line + '\n\n';
          }
        }
      }
      
      // Add the last section
      if (currentSection.content.trim()) {
        sections.push(currentSection);
      }
      
      return sections;
    } catch (error) {
      logger.error('Error parsing content sections', error);
      // Return content as single section if parsing fails
      return [{ title: '', content }];
    }
  }
  
  /**
   * Generate a filename for the document
   * @param {String} templateType - Type of document
   * @param {Object} data - Document data
   * @returns {String} - Generated filename
   * @private
   */
  _generateFileName(templateType, data) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const projectId = data && data.projectId ? data.projectId : 'unknown';
    
    let prefix;
    switch (templateType) {
      case 'projetMarche':
        prefix = 'PM';
        break;
      case 'reglementConsultation':
        prefix = 'RC';
        break;
      case 'grilleEvaluation':
        prefix = 'GE';
        break;
      case 'lettreConsultation':
        prefix = 'LC';
        break;
      default:
        prefix = 'DOC';
    }
    
    return `${prefix}_${projectId}_${timestamp}`;
  }
}

module.exports = new DocumentGenerationService();