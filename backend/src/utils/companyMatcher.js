// backend/src/utils/companyMatcher.js
const logger = require('./logger');

/**
 * Utility for matching companies based on selection criteria
 */
class CompanyMatcher {
  /**
   * Match companies against selection criteria without using AI
   * A fallback method if AI service is not available
   * @param {Array} companies - List of all companies
   * @param {Array} criteria - Selection criteria
   * @returns {Array} - List of matched companies with scores
   */
  matchCompanies(companies, criteria) {
    try {
      // Filter out criteria that are not selected
      const selectedCriteria = criteria.filter(c => c.selected);
      
      if (selectedCriteria.length === 0) {
        return companies.map(company => ({
          ...company,
          score: 100, // All companies match if no criteria selected
          matchDetails: {}
        }));
      }
      
      const matchedCompanies = companies.map(company => {
        // Calculate match for each criterion
        const matchDetails = {};
        let totalScore = 0;
        
        selectedCriteria.forEach(criterion => {
          const score = this._calculateCriterionMatch(company, criterion);
          matchDetails[criterion.name] = score;
          totalScore += score;
        });
        
        // Calculate average score
        const finalScore = Math.round(totalScore / selectedCriteria.length);
        
        return {
          ...company,
          score: finalScore,
          matchDetails
        };
      });
      
      // Sort by score (highest first)
      return matchedCompanies.sort((a, b) => b.score - a.score);
    } catch (error) {
      logger.error('Error matching companies against criteria', error);
      return companies;
    }
  }
  
  /**
   * Calculate how well a company matches a specific criterion
   * @param {Object} company - Company to evaluate
   * @param {Object} criterion - Selection criterion
   * @returns {Number} - Match score (0-100)
   * @private
   */
  _calculateCriterionMatch(company, criterion) {
    try {
      const criterionName = criterion.name.toLowerCase();
      
      // Certification criterion
      if (criterionName.includes('certification') || criterionName.includes('mase')) {
        return this._matchCertification(company, criterion);
      }
      
      // Experience criterion
      if (criterionName.includes('expérience') || criterionName.includes('projet')) {
        return this._matchExperience(company, criterion);
      }
      
      // Zone d'intervention criterion
      if (criterionName.includes('zone') || criterionName.includes('région') || criterionName.includes('localisation')) {
        return this._matchZone(company, criterion);
      }
      
      // Capacity/size criterion
      if (criterionName.includes('capacité') || criterionName.includes('taille') || 
          criterionName.includes('effectif') || criterionName.includes('production')) {
        return this._matchCapacity(company, criterion);
      }
      
      // Default generic matching
      return this._matchGeneric(company, criterion);
    } catch (error) {
      logger.error('Error calculating criterion match', error);
      return 0;
    }
  }
  
  /**
   * Match certification criteria
   * @param {Object} company 
   * @param {Object} criterion 
   * @returns {Number} - Match score (0-100)
   * @private
   */
  _matchCertification(company, criterion) {
    // If company has no certifications data
    if (!company.certifications || !Array.isArray(company.certifications)) {
      return 0;
    }
    
    const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
    
    // Check for required certifications mentioned in criterion description
    const requiredCerts = [];
    
    // Common certifications to check for
    const certTypes = [
      { name: 'MASE', keywords: ['mase'] },
      { name: 'ISO 9001', keywords: ['iso 9001', 'iso9001', 'qualité'] },
      { name: 'ISO 14001', keywords: ['iso 14001', 'iso14001', 'environnement'] },
      { name: 'QUALIBAT', keywords: ['qualibat'] },
      { name: 'QUALIFELEC', keywords: ['qualifelec'] }
    ];
    
    certTypes.forEach(cert => {
      if (cert.keywords.some(keyword => criterionDesc.includes(keyword))) {
        requiredCerts.push(cert.name);
      }
    });
    
    // If no specific certifications identified, any certification is good
    if (requiredCerts.length === 0) {
      return company.certifications.length > 0 ? 100 : 0;
    }
    
    // Count matches
    let matches = 0;
    const companyCerts = company.certifications.map(c => c.toLowerCase());
    
    requiredCerts.forEach(cert => {
      if (companyCerts.some(c => c.includes(cert.toLowerCase()))) {
        matches++;
      }
    });
    
    return Math.round((matches / requiredCerts.length) * 100);
  }
  
  /**
   * Match experience criteria
   * @param {Object} company 
   * @param {Object} criterion 
   * @returns {Number} - Match score (0-100)
   * @private
   */
  _matchExperience(company, criterion) {
    if (!company.experience) {
      return 0;
    }
    
    const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
    const companyExp = company.experience.toString().toLowerCase();
    
    // Try to extract number of required projects
    let requiredProjects = 0;
    const projectMatch = criterionDesc.match(/minimum\s+(\d+)\s+projets?/i);
    if (projectMatch && projectMatch[1]) {
      requiredProjects = parseInt(projectMatch[1], 10);
    }
    
    // Try to extract number of company projects
    let companyProjects = 0;
    const companyProjMatch = companyExp.match(/(\d+)\s+projets?/i);
    if (companyProjMatch && companyProjMatch[1]) {
      companyProjects = parseInt(companyProjMatch[1], 10);
    }
    
    // If we have both numbers, compare them
    if (requiredProjects > 0 && companyProjects > 0) {
      if (companyProjects >= requiredProjects) {
        return 100;
      } else {
        return Math.round((companyProjects / requiredProjects) * 100);
      }
    }
    
    // Fallback: check for experience-related keywords
    const expKeywords = [
      'expérience', 'projets similaires', 'réalisations', 
      'antécédents', 'travaux similaires'
    ];
    
    // If any keyword is present in company experience, consider it a match
    for (const keyword of expKeywords) {
      if (companyExp.includes(keyword)) {
        return 100;
      }
    }
    
    return 50; // Partial match if we can't determine precisely
  }
  
  /**
   * Match zone/region criteria
   * @param {Object} company 
   * @param {Object} criterion 
   * @returns {Number} - Match score (0-100)
   * @private
   */
  _matchZone(company, criterion) {
    if (!company.location && !company.interventionZone) {
      return 0;
    }
    
    // Use either specific interventionZone field or location
    const companyZone = company.interventionZone || company.location;
    const companyZoneLower = companyZone.toString().toLowerCase();
    
    // Check if criterion has selected departments/regions
    if (criterion.selectedDepartments && criterion.selectedDepartments.length > 0) {
      for (const dept of criterion.selectedDepartments) {
        // Extract department code or name
        let deptCode = '';
        let deptName = '';
        
        const deptMatch = dept.match(/(\d+)\s*-\s*(.+)/);
        if (deptMatch) {
          deptCode = deptMatch[1];
          deptName = deptMatch[2].trim().toLowerCase();
        } else {
          deptName = dept.trim().toLowerCase();
        }
        
        // Check if company zone contains this department
        if (deptCode && companyZoneLower.includes(deptCode)) {
          return 100;
        }
        
        if (deptName && companyZoneLower.includes(deptName)) {
          return 100;
        }
      }
      
      return 0; // No match with any selected department
    }
    
    // If no specific departments are selected, check description
    const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
    
    // Extract regions/departments from description
    const locationKeywords = [
      'île-de-france', 'ile-de-france', 'idf', 'paris',
      'nord', 'est', 'ouest', 'sud', 
      'région parisienne', 'national'
    ];
    
    for (const keyword of locationKeywords) {
      if (criterionDesc.includes(keyword) && companyZoneLower.includes(keyword)) {
        return 100;
      }
    }
    
    // Check for department codes
    const deptCodesInDesc = criterionDesc.match(/\b\d{2,3}\b/g);
    if (deptCodesInDesc) {
      for (const code of deptCodesInDesc) {
        if (companyZoneLower.includes(code)) {
          return 100;
        }
      }
    }
    
    // Partial match if we couldn't determine precisely
    return 50;
  }
  
  /**
   * Match capacity/size criteria
   * @param {Object} company 
   * @param {Object} criterion 
   * @returns {Number} - Match score (0-100)
   * @private
   */
  _matchCapacity(company, criterion) {
    const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
    
    // Try to extract required employee count
    let requiredEmployees = 0;
    const employeeMatch = criterionDesc.match(/minimum\s+(\d+)\s+(?:salariés|employés|personnes)/i);
    if (employeeMatch && employeeMatch[1]) {
      requiredEmployees = parseInt(employeeMatch[1], 10);
    }
    
    // Check if company has employee data
    if (company.employees) {
      const companyEmployees = parseInt(company.employees, 10);
      if (!isNaN(companyEmployees)) {
        if (requiredEmployees > 0) {
          if (companyEmployees >= requiredEmployees) {
            return 100;
          } else {
            return Math.round((companyEmployees / requiredEmployees) * 100);
          }
        } else {
          // If no specific requirement, assume bigger is better
          if (companyEmployees > 50) return 100;
          if (companyEmployees > 20) return 90;
          if (companyEmployees > 10) return 80;
          if (companyEmployees > 5) return 70;
          return 50;
        }
      }
    }
    
    // Check for company size in revenue if employee count not available
    if (company.ca) {
      const caString = company.ca.toString().toLowerCase();
      
      // Extract revenue amount
      let revenue = 0;
      const revenueMatch = caString.match(/(\d+(?:\.\d+)?)\s*(?:k€|k|m€|m|€)/i);
      if (revenueMatch && revenueMatch[1]) {
        revenue = parseFloat(revenueMatch[1]);
        
        // Adjust for units
        if (caString.includes('k€') || caString.includes('k')) {
          revenue *= 1000;
        } else if (caString.includes('m€') || caString.includes('m')) {
          revenue *= 1000000;
        }
        
        // Evaluate size based on revenue
        if (revenue > 10000000) return 100; // >10M€
        if (revenue > 5000000) return 90;   // >5M€
        if (revenue > 1000000) return 80;   // >1M€
        if (revenue > 500000) return 70;    // >500k€
        return 60;
      }
    }
    
    // Fallback if we can't determine precise match
    return 50;
  }
  
  /**
   * Generic criterion matching
   * @param {Object} company 
   * @param {Object} criterion 
   * @returns {Number} - Match score (0-100)
   * @private
   */
  _matchGeneric(company, criterion) {
    const criterionName = criterion.name.toLowerCase();
    const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
    
    // Convert company to string for keyword matching
    const companyStr = JSON.stringify(company).toLowerCase();
    
    // Extract key terms from criterion name and description
    const terms = [...criterionName.split(' '), ...criterionDesc.split(' ')]
      .filter(term => term.length > 3) // Skip short words
      .map(term => term.replace(/[,.;:!?()[\]{}'"]/g, '').trim()) // Clean up terms
      .filter(term => term && !['pour', 'avec', 'dans', 'les', 'des', 'qui', 'est', 'sont', 'ont'].includes(term)); // Skip common words
    
    // Count how many terms are found in company data
    const matchedTerms = terms.filter(term => companyStr.includes(term));
    
    if (terms.length === 0) {
      return 50; // Can't determine match
    }
    
    return Math.round((matchedTerms.length / terms.length) * 100);
  }
}

module.exports = new CompanyMatcher();