// frontend/src/utils/scoreCalculator.js
/**
 * Utility for calculating company scores based on criteria
 */
const scoreCalculator = {
    /**
     * Calculate a company's match score against selection criteria
     * @param {Object} company - Company data
     * @param {Array} criteria - Selection criteria
     * @returns {Number} - Score (0-100)
     */
    calculateMatchScore: (company, criteria) => {
      // Filter only selected criteria
      const selectedCriteria = criteria.filter(c => c.selected);
      
      if (selectedCriteria.length === 0) {
        return 100; // If no criteria selected, all companies match perfectly
      }
      
      let totalScore = 0;
      
      // Calculate score for each criterion
      selectedCriteria.forEach(criterion => {
        const criterionScore = scoreCalculator.calculateCriterionScore(company, criterion);
        totalScore += criterionScore;
      });
      
      // Calculate average score (0-100)
      return Math.round(totalScore / selectedCriteria.length);
    },
    
    /**
     * Calculate how well a company matches a specific criterion
     * @param {Object} company - Company data
     * @param {Object} criterion - Selection criterion
     * @returns {Number} - Score (0-100)
     */
    calculateCriterionScore: (company, criterion) => {
      const criterionName = criterion.name.toLowerCase();
      
      // Certification criterion
      if (criterionName.includes('certification') || criterionName.includes('mase')) {
        return scoreCalculator.matchCertifications(company, criterion);
      }
      
      // Experience criterion
      if (criterionName.includes('expérience') || criterionName.includes('projet')) {
        return scoreCalculator.matchExperience(company, criterion);
      }
      
      // Zone criterion
      if (criterionName.includes('zone') || criterionName.includes('région') || criterionName.includes('localisation')) {
        return scoreCalculator.matchZone(company, criterion);
      }
      
      // Size/capacity criterion
      if (criterionName.includes('capacité') || criterionName.includes('taille') || criterionName.includes('effectif')) {
        return scoreCalculator.matchSize(company, criterion);
      }
      
      // Generic matching for other criteria
      return scoreCalculator.matchGeneric(company, criterion);
    },
    
    /**
     * Match company certifications against criterion
     * @param {Object} company - Company data
     * @param {Object} criterion - Certification criterion
     * @returns {Number} - Score (0-100)
     */
    matchCertifications: (company, criterion) => {
      if (!company.certifications || company.certifications.length === 0) {
        return 0;
      }
      
      const certifications = company.certifications.map(cert => cert.toLowerCase());
      const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
      
      // Check if "MASE" certification is specifically required
      if (criterionDesc.includes('mase obligatoire') || 
          criterion.name.toLowerCase().includes('mase obligatoire')) {
        return certifications.some(cert => cert.includes('mase')) ? 100 : 0;
      }
      
      // Check for any mention of MASE
      if (criterionDesc.includes('mase') || criterion.name.toLowerCase().includes('mase')) {
        if (certifications.some(cert => cert.includes('mase'))) {
          return 100;
        } else {
          // Check for equivalent certifications (ISO 45001, OHSAS 18001)
          if (certifications.some(cert => 
              cert.includes('iso 45001') || 
              cert.includes('ohsas') || 
              cert.includes('sécurité'))) {
            return 80; // Equivalent but not exactly MASE
          }
          return 0;
        }
      }
      
      // Check for ISO 9001
      if (criterionDesc.includes('iso 9001') || criterionDesc.includes('qualité')) {
        return certifications.some(cert => 
          cert.includes('iso 9001') || cert.includes('qualité')) ? 100 : 0;
      }
      
      // Check for ISO 14001
      if (criterionDesc.includes('iso 14001') || criterionDesc.includes('environnement')) {
        return certifications.some(cert => 
          cert.includes('iso 14001') || cert.includes('environnement')) ? 100 : 0;
      }
      
      // If we reach here, just check if company has any certifications
      return company.certifications.length > 0 ? 100 : 0;
    },
    
    /**
     * Match company experience against criterion
     * @param {Object} company - Company data
     * @param {Object} criterion - Experience criterion
     * @returns {Number} - Score (0-100)
     */
    matchExperience: (company, criterion) => {
      if (!company.experience) {
        return 0;
      }
      
      const experience = company.experience.toString().toLowerCase();
      const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
      
      // Try to extract required number of projects
      const requiredMatch = criterionDesc.match(/minimum\s+(\d+)\s+projets?/i);
      const requiredProjects = requiredMatch ? parseInt(requiredMatch[1], 10) : 0;
      
      // Try to extract company's number of projects
      const companyMatch = experience.match(/(\d+)\s+projets?/i);
      const companyProjects = companyMatch ? parseInt(companyMatch[1], 10) : 0;
      
      if (requiredProjects > 0 && companyProjects > 0) {
        if (companyProjects >= requiredProjects) {
          return 100;
        } else {
          // Partial score based on ratio of projects
          return Math.min(100, Math.round((companyProjects / requiredProjects) * 100));
        }
      }
      
      // If can't extract numbers, use keyword matching
      if (experience.includes('projets similaires') || 
          experience.includes('expérience similaire') ||
          experience.includes('réalisations similaires')) {
        return 100;
      }
      
      return 50; // Partial match
    },
    
    /**
     * Match company zone against criterion
     * @param {Object} company - Company data
     * @param {Object} criterion - Zone criterion
     * @returns {Number} - Score (0-100)
     */
    matchZone: (company, criterion) => {
      if (!company.location) {
        return 0;
      }
      
      const location = company.location.toLowerCase();
      
      // Check if criterion has selected departments/regions
      if (criterion.selectedDepartments && criterion.selectedDepartments.length > 0) {
        // Check if company location contains any of the selected departments
        for (const dept of criterion.selectedDepartments) {
          const deptLower = dept.toLowerCase();
          
          // Extract department code
          const deptCode = deptLower.split('-')[0].trim();
          
          // Extract department name
          const deptName = deptLower.includes('-') 
            ? deptLower.split('-')[1].trim()
            : deptLower;
          
          // Check if company location contains the department code or name
          if (location.includes(deptCode) || location.includes(deptName)) {
            return 100;
          }
        }
        
        // No match with any selected department
        return 0;
      }
      
      // If no specific departments are selected, check for region match
      const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
      
      // Check for Paris/Île-de-France region
      if ((criterionDesc.includes('île-de-france') || criterionDesc.includes('ile-de-france') || 
           criterionDesc.includes('paris') || criterionDesc.includes('région parisienne')) && 
          (location.includes('paris') || location.includes('île-de-france') || 
           location.includes('ile-de-france') || location.includes('idf'))) {
        return 100;
      }
      
      // Check for other regions
      const regions = [
        'nord', 'est', 'ouest', 'sud', 'centre', 'normandie', 'bretagne', 
        'provence', 'alpes', 'rhône', 'aquitaine', 'occitanie'
      ];
      
      for (const region of regions) {
        if (criterionDesc.includes(region) && location.includes(region)) {
          return 100;
        }
      }
      
      // If company operates nationally
      if (location.includes('national') || location.includes('france entière')) {
        return 100;
      }
      
      return 30; // Low match if we can't determine precisely
    },
    
    /**
     * Match company size/capacity against criterion
     * @param {Object} company - Company data
     * @param {Object} criterion - Size/capacity criterion
     * @returns {Number} - Score (0-100)
     */
    matchSize: (company, criterion) => {
      const criterionDesc = criterion.description ? criterion.description.toLowerCase() : '';
      
      // Try to extract required employee count
      const employeeMatch = criterionDesc.match(/minimum\s+(\d+)\s+(?:salariés|employés|personnes)/i);
      const requiredEmployees = employeeMatch ? parseInt(employeeMatch[1], 10) : 0;
      
      // Check company employee count
      if (company.employees) {
        const employeeCount = parseInt(company.employees, 10);
        
        if (!isNaN(employeeCount)) {
          if (requiredEmployees > 0) {
            if (employeeCount >= requiredEmployees) {
              return 100;
            } else {
              // Partial score based on ratio
              return Math.min(100, Math.round((employeeCount / requiredEmployees) * 100));
            }
          } else {
            // If no specific requirement, assume bigger is better (up to a point)
            if (employeeCount > 50) return 100;
            if (employeeCount > 20) return 90;
            if (employeeCount > 10) return 80;
            if (employeeCount > 5) return 70;
            return 50;
          }
        }
      }
      
      // If no employee info, try to use revenue as a proxy for size
      if (company.ca) {
        const caStr = company.ca.toString().toLowerCase();
        let revenue = 0;
        
        // Try to extract revenue value
        const match = caStr.match(/(\d+(?:[.,]\d+)?)\s*([mk])?[€]?/i);
        
        if (match) {
          revenue = parseFloat(match[1].replace(',', '.'));
          
          // Apply multiplier for K/M
          if (match[2]) {
            if (match[2].toLowerCase() === 'k') {
              revenue *= 1000;
            } else if (match[2].toLowerCase() === 'm') {
              revenue *= 1000000;
            }
          }
          
          // Score based on revenue size
          if (revenue > 10000000) return 100; // >10M€
          if (revenue > 5000000) return 90;   // >5M€
          if (revenue > 1000000) return 80;   // >1M€
          if (revenue > 500000) return 70;    // >500k€
          if (revenue > 100000) return 60;    // >100k€
          return 50;
        }
      }
      
      return 50; // Average score if we can't determine
    },
    
    /**
     * Generic criterion matching
     * @param {Object} company - Company data
     * @param {Object} criterion - Generic criterion
     * @returns {Number} - Score (0-100)
     */
    matchGeneric: (company, criterion) => {
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
  };
  
  export default scoreCalculator;