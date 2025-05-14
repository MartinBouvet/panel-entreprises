// frontend/src/utils/excelParser.js
import * as XLSX from 'xlsx';

/**
 * Utility for parsing Excel files
 */
const excelParser = {
  /**
   * Parse Excel file to JSON
   * @param {File} file - Excel file object
   * @returns {Promise<Array>} - Parsed data as array of objects
   */
  parseExcelFile: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          
          // Get first sheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Convert to JSON with headers
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            raw: false,
            dateNF: 'DD/MM/YYYY'
          });
          
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`Failed to parse Excel file: ${error.message}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read Excel file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  },
  
  /**
   * Extract companies data from Excel
   * @param {Array} data - Raw Excel data
   * @returns {Array} - Normalized companies data
   */
  extractCompaniesData: (data) => {
    // Normalize and clean up the data
    return data.map((row, index) => {
      // Create a normalized company object
      const company = {
        id: row.ID || row.Id || row.id || `company-${index + 1}`,
        name: row.Nom || row.Name || row.Entreprise || row['Raison Sociale'] || `Entreprise ${index + 1}`,
        location: row.Localisation || row.Location || row.Adresse || row.Ville || 'Non spécifié',
        certifications: [],
        ca: row.CA || row['Chiffre d\'affaires'] || row.Revenue || 'Non spécifié',
        employees: row.Effectifs || row.Employees || row.Personnel || 'Non spécifié',
        experience: row.Experience || row.Expérience || row['Projets similaires'] || 'Non spécifié'
      };
      
      // Extract certifications from different possible columns
      if (row.Certifications) {
        company.certifications = row.Certifications.split(',').map(cert => cert.trim());
      } else {
        // Check for individual certification columns
        const certColumns = ['MASE', 'ISO 9001', 'ISO 14001', 'QUALIBAT'];
        certColumns.forEach(cert => {
          if (row[cert] && row[cert].toLowerCase() !== 'non' && row[cert] !== '0') {
            company.certifications.push(cert);
          }
        });
      }
      
      return company;
    });
  }
};

export default excelParser;