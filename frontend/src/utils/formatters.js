// frontend/src/utils/formatters.js
/**
 * Utility functions for formatting data
 */
const formatters = {
    /**
     * Format a date string to DD/MM/YYYY format
     * @param {String|Date} date - Date to format
     * @returns {String} - Formatted date string
     */
    formatDate: (date) => {
      if (!date) return '';
      
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (isNaN(dateObj.getTime())) {
        return '';
      }
      
      return dateObj.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    
    /**
     * Format a currency value
     * @param {Number|String} value - Currency value
     * @param {String} currency - Currency symbol (default: '€')
     * @returns {String} - Formatted currency string
     */
    formatCurrency: (value, currency = '€') => {
      if (value === undefined || value === null) return '';
      
      // Convert to number if it's a string
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      
      if (isNaN(numValue)) {
        return '';
      }
      
      // Format with French locale (space as thousands separator, comma as decimal separator)
      return numValue.toLocaleString('fr-FR') + ' ' + currency;
    },
    
    /**
     * Format a percentage value
     * @param {Number|String} value - Percentage value
     * @returns {String} - Formatted percentage string
     */
    formatPercentage: (value) => {
      if (value === undefined || value === null) return '';
      
      // Convert to number if it's a string
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      
      if (isNaN(numValue)) {
        return '';
      }
      
      return numValue.toLocaleString('fr-FR') + ' %';
    },
    
    /**
     * Format a file size
     * @param {Number} bytes - File size in bytes
     * @returns {String} - Formatted file size string
     */
    formatFileSize: (bytes) => {
      if (bytes === 0) return '0 Bytes';
      
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    /**
     * Truncate a long string
     * @param {String} str - String to truncate
     * @param {Number} maxLength - Maximum length
     * @returns {String} - Truncated string
     */
    truncateString: (str, maxLength = 100) => {
      if (!str) return '';
      
      if (str.length <= maxLength) {
        return str;
      }
      
      return str.substring(0, maxLength) + '...';
    },
    
    /**
     * Format a company name
     * @param {Object} company - Company object
     * @returns {String} - Formatted company name with location
     */
    formatCompanyName: (company) => {
      if (!company) return '';
      
      if (company.location) {
        return `${company.name} (${company.location})`;
      }
      
      return company.name;
    },
    
    /**
     * Format a list of certifications
     * @param {Array} certifications - List of certification strings
     * @returns {String} - Formatted certifications string
     */
    formatCertifications: (certifications) => {
      if (!certifications || !Array.isArray(certifications) || certifications.length === 0) {
        return 'Aucune certification';
      }
      
      return certifications.join(', ');
    },
    
    /**
     * Get badge class for a certification
     * @param {String} certification - Certification name
     * @returns {String} - CSS class for the certification badge
     */
    getCertificationBadgeClass: (certification) => {
      if (!certification) return '';
      
      const certLower = certification.toLowerCase();
      
      if (certLower.includes('mase')) {
        return 'certification-badge mase';
      }
      
      if (certLower.includes('iso')) {
        return 'certification-badge iso';
      }
      
      if (certLower.includes('qualibat')) {
        return 'certification-badge qualibat';
      }
      
      return 'certification-badge';
    },
    
    /**
     * Get class for a score value
     * @param {Number} score - Score value (0-100)
     * @returns {String} - CSS class for the score
     */
    getScoreClass: (score) => {
      if (score >= 80) {
        return 'score-high';
      }
      
      if (score >= 60) {
        return 'score-medium';
      }
      
      return 'score-low';
    }
  };
  
  export default formatters;