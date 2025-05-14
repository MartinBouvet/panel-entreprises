// frontend/src/utils/criteriaUtils.js
/**
 * Utility functions for working with selection and attribution criteria
 */
const criteriaUtils = {
    /**
     * Generate default selection criteria
     * @returns {Array} - Array of default selection criteria objects
     */
    getDefaultSelectionCriteria: () => {
      return [
        {
          id: 1,
          name: 'Expérience dans projets similaires',
          description: 'Minimum 3 projets similaires réalisés dans les 5 dernières années',
          selected: true
        },
        {
          id: 2,
          name: 'Certification MASE ou équivalent',
          description: 'Certification obligatoire pour ce type de travaux',
          selected: true
        },
        {
          id: 3,
          name: 'Zone d\'intervention',
          description: 'Sélectionnez les départements concernés',
          selected: true,
          options: [
            '01 - Ain', '02 - Aisne', '03 - Allier', '04 - Alpes-de-Haute-Provence',
            '05 - Hautes-Alpes', '06 - Alpes-Maritimes', '07 - Ardèche', '08 - Ardennes',
            '09 - Ariège', '10 - Aube', '11 - Aude', '12 - Aveyron'
            // Add other departments as needed
          ]
        },
        {
          id: 4,
          name: 'Capacité de production',
          description: 'Minimum 10 salariés pour assurer les délais',
          selected: true
        }
      ];
    },
    
    /**
     * Generate default attribution criteria
     * @returns {Array} - Array of default attribution criteria objects
     */
    getDefaultAttributionCriteria: () => {
      return [
        {
          id: 1,
          name: 'Qualité technique de l\'offre',
          weight: 40
        },
        {
          id: 2,
          name: 'Coût global de l\'offre',
          weight: 30
        },
        {
          id: 3,
          name: 'Respect des délais',
          weight: 15
        },
        {
          id: 4,
          name: 'Qualité de l\'organisation sécurité',
          weight: 10
        },
        {
          id: 5,
          name: 'Intégration de la RSE',
          weight: 5
        }
      ];
    },
    
    /**
     * Ensure the total weight of attribution criteria is 100%
     * @param {Array} criteria - Attribution criteria array
     * @returns {Array} - Adjusted attribution criteria with total weight of 100%
     */
    normalizeAttributionCriteria: (criteria) => {
      if (!criteria || criteria.length === 0) {
        return [];
      }
      
      const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
      
      if (totalWeight === 100) {
        return criteria;
      }
      
      // If total is not 100%, adjust weights proportionally
      const normalizedCriteria = criteria.map(criterion => ({
        ...criterion,
        weight: Math.round((criterion.weight / totalWeight) * 100)
      }));
      
      // Handle rounding errors by adjusting the first criterion
      const newTotal = normalizedCriteria.reduce((sum, criterion) => sum + criterion.weight, 0);
      
      if (newTotal !== 100 && normalizedCriteria.length > 0) {
        normalizedCriteria[0].weight += (100 - newTotal);
      }
      
      return normalizedCriteria;
    },
    
    /**
     * Merge AI generated criteria with existing criteria
     * Updates existing criteria with AI suggestions while preserving user selections
     * @param {Array} existingCriteria - Current criteria
     * @param {Array} aiCriteria - AI generated criteria
     * @returns {Array} - Merged criteria
     */
    mergeCriteria: (existingCriteria, aiCriteria) => {
      if (!aiCriteria || aiCriteria.length === 0) {
        return existingCriteria;
      }
      
      if (!existingCriteria || existingCriteria.length === 0) {
        return aiCriteria;
      }
      
      const mergedCriteria = [...existingCriteria];
      
      // Map existing criteria by name for easy lookup
      const existingCriteriaMap = new Map(
        existingCriteria.map(criterion => [criterion.name.toLowerCase(), criterion])
      );
      
      // Add or update criteria from AI suggestions
      aiCriteria.forEach(aiCriterion => {
        const lowerName = aiCriterion.name.toLowerCase();
        
        if (existingCriteriaMap.has(lowerName)) {
          // Update existing criterion but preserve selection state
          const existingCriterion = existingCriteriaMap.get(lowerName);
          const index = mergedCriteria.findIndex(c => c.id === existingCriterion.id);
          
          if (index !== -1) {
            mergedCriteria[index] = {
              ...mergedCriteria[index],
              description: aiCriterion.description || mergedCriteria[index].description,
              options: aiCriterion.options || mergedCriteria[index].options,
              weight: aiCriterion.weight !== undefined ? aiCriterion.weight : mergedCriteria[index].weight
            };
          }
        } else {
          // Add new criterion with a unique ID
          const newId = Math.max(0, ...mergedCriteria.map(c => c.id)) + 1;
          mergedCriteria.push({
            ...aiCriterion,
            id: newId,
            selected: aiCriterion.selected !== undefined ? aiCriterion.selected : true
          });
        }
      });
      
      return mergedCriteria;
    }
  };
  
  export default criteriaUtils;