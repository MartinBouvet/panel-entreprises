// backend/src/services/excelService.js
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger');

/**
 * Service for handling Excel files operations
 */
class ExcelService {
  /**
   * Parse an Excel file with company data
   * @param {Buffer|String} fileContent - Excel file content or path
   * @returns {Array} - Array of company objects
   */
  parseCompaniesExcel(fileContent) {
    try {
      logger.info('Parsing companies Excel file');
      
      // Read the workbook
      const workbook = XLSX.read(fileContent, { 
        type: Buffer.isBuffer(fileContent) ? 'buffer' : 'file',
        cellDates: true,
        cellNF: true,
        cellStyles: true
      });
      
      // Get the first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to JSON
      const companies = XLSX.utils.sheet_to_json(worksheet, { 
        raw: false,
        dateNF: 'DD/MM/YYYY',
        defval: ''
      });
      
      // Process and normalize the data
      return companies.map(company => this._normalizeCompanyData(company));
    } catch (error) {
      logger.error('Error parsing companies Excel file', error);
      throw new Error('Failed to parse Excel file: ' + error.message);
    }
  }
  
  /**
   * Generate an evaluation grid Excel file
   * @param {Object} projectData - Project data
   * @param {Array} companies - Selected companies
   * @returns {Buffer} - Generated Excel file content
   */
  generateEvaluationGrid(projectData, companies) {
    try {
      logger.info('Generating evaluation grid Excel file');
      
      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const wsData = [];
      
      // Add headers
      wsData.push(['Grille d\'évaluation des offres']);
      wsData.push(['Projet:', projectData.title || 'Non spécifié']);
      wsData.push(['Date:', new Date().toLocaleDateString('fr-FR')]);
      wsData.push([]);
      
      // Add criteria headers
      const criteriaRow = ['Entreprise'];
      projectData.attributionCriteria.forEach(criterion => {
        criteriaRow.push(`${criterion.name} (${criterion.weight}%)`);
      });
      criteriaRow.push('Score total');
      criteriaRow.push('Classement');
      wsData.push(criteriaRow);
      
      // Add company rows
      companies.forEach(company => {
        const companyRow = [company.name];
        // Add empty cells for each criterion
        projectData.attributionCriteria.forEach(() => {
          companyRow.push('');
        });
        // Add formula for total score
        const firstScoreCell = XLSX.utils.encode_cell({r: wsData.length, c: 1});
        const lastScoreCell = XLSX.utils.encode_cell({r: wsData.length, c: criteriaRow.length - 3});
        companyRow.push({
          f: `SUMPRODUCT(${firstScoreCell}:${lastScoreCell}, $B$5:$${XLSX.utils.encode_col(criteriaRow.length - 3)}$5)`
        });
        // Add empty cell for ranking
        companyRow.push('');
        wsData.push(companyRow);
      });
      
      // Create the worksheet
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      
      // Set column widths
      const colWidths = [25, 20, 20, 20, 20, 15, 15];
      ws['!cols'] = colWidths.map(w => ({ width: w }));
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, ws, 'Evaluation');
      
      // Generate buffer
      return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    } catch (error) {
      logger.error('Error generating evaluation grid Excel file', error);
      throw new Error('Failed to generate evaluation grid');
    }
  }
  
  /**
   * Save an Excel file to disk
   * @param {Buffer} content - Excel file content 
   * @param {String} fileName - File name
   * @param {String} outputDir - Output directory
   * @returns {String} - Path to saved file
   */
  saveExcelFile(content, fileName, outputDir = 'uploads') {
    try {
      // Ensure the output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(filePath, content);
      logger.info(`Excel file saved to ${filePath}`);
      
      return filePath;
    } catch (error) {
      logger.error('Error saving Excel file', error);
      throw new Error('Failed to save Excel file');
    }
  }
  
  /**
   * Normalize company data from Excel
   * @param {Object} company - Raw company data from Excel
   * @returns {Object} - Normalized company data
   * @private
   */
  _normalizeCompanyData(company) {
    // Handle different field names and formats
    const normalizedCompany = {
      id: company.ID || company.id || company.Identifiant || String(Math.random()).substring(2, 10),
      name: company.Nom || company.name || company.Entreprise || company.RaisonSociale || 'Inconnu',
      location: company.Localisation || company.location || company.Ville || company.Adresse || 'Non spécifié',
      contact: company.Contact || company.contact || company.Email || company.Telephone || 'Non spécifié',
      certifications: []
    };
    
    // Extract certifications
    const certFields = ['Certifications', 'certifications', 'MASE', 'ISO9001', 'ISO14001', 'QUALIBAT'];
    certFields.forEach(field => {
      if (company[field] && company[field].toString().toLowerCase() !== 'non' && company[field].toString().trim() !== '') {
        if (field === 'Certifications' || field === 'certifications') {
          // Split comma-separated certifications
          const certs = company[field].toString().split(',').map(c => c.trim());
          normalizedCompany.certifications.push(...certs);
        } else {
          // Individual certification fields
          normalizedCompany.certifications.push(field);
        }
      }
    });
    
    // Extract experience fields
    const experienceFields = ['Projets_Similaires', 'ProjetsSimilaires', 'Experience', 'Expérience'];
    experienceFields.forEach(field => {
      if (company[field]) {
        normalizedCompany.experience = company[field].toString();
        return;
      }
    });
    
    // Extract financial info
    const financialFields = ['CA', 'ChiffreAffaires', 'Chiffre_Affaires', 'CA_Annuel'];
    financialFields.forEach(field => {
      if (company[field]) {
        normalizedCompany.ca = company[field].toString();
        return;
      }
    });
    
    // Handle other potential fields
    const mappings = {
      'SIRET': 'siret',
      'Effectifs': 'employees',
      'Employés': 'employees',
      'DateCreation': 'creationDate',
      'Date_Creation': 'creationDate',
      'Spécialité': 'specialty',
      'Specialite': 'specialty',
      'Domaine': 'domain',
      'Zone_Intervention': 'interventionZone',
      'ZoneIntervention': 'interventionZone'
    };
    
    Object.entries(mappings).forEach(([excelField, normalizedField]) => {
      if (company[excelField]) {
        normalizedCompany[normalizedField] = company[excelField].toString();
      }
    });
    
    return normalizedCompany;
  }
}

module.exports = new ExcelService();