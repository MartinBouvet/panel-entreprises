// frontend/src/contexts/SearchContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import useCompanySearch from '../hooks/useCompanySearch';
import useFileUpload from '../hooks/useFileUpload';
import useDocumentGeneration from '../hooks/useDocumentGeneration';

// Create context
const SearchContext = createContext();

/**
 * Provider component for search functionality
 * @param {Object} props - Component props
 */
export const SearchProvider = ({ children }) => {
  // Project data
  const [projectData, setProjectData] = useState({
    id: `project-${Date.now()}`,
    title: '',
    description: '',
    budget: '',
    deadline: ''
  });
  
  // Search step
  const [currentStep, setCurrentStep] = useState(1);
  
  // Get custom hooks
  const companySearch = useCompanySearch();
  const fileUpload = useFileUpload();
  const documentGeneration = useDocumentGeneration();
  
  // Load templates on mount
  useEffect(() => {
    documentGeneration.loadTemplates();
  }, []);
  
  // Calculate if step is complete
  const isStepComplete = (step) => {
    switch (step) {
      case 1: // Cahier des charges
        return !!fileUpload.fileContent;
      case 2: // Critères
        return (
          companySearch.selectionCriteria.length > 0 && 
          companySearch.selectionCriteria.some(c => c.selected) &&
          companySearch.attributionCriteria.length > 0 && 
          companySearch.attributionCriteria.reduce((sum, c) => sum + c.weight, 0) === 100
        );
      case 3: // Liste courte
        return companySearch.matchedCompanies.length > 0;
      case 4: // Documents
        return documentGeneration.generatedDocuments.length > 0;
      default:
        return false;
    }
  };
  
  // Handle next step
  const goToNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle go to step
  const goToStep = (step) => {
    if (step >= 1 && step <= 8) {
      setCurrentStep(step);
    }
  };
  
  // Update project data
  const updateProjectData = (data) => {
    setProjectData(prevData => ({
      ...prevData,
      ...data
    }));
  };
  
  // Reset search
  const resetSearch = () => {
    setCurrentStep(1);
    fileUpload.resetUpload();
    companySearch.setSelectionCriteria([]);
    companySearch.setAttributionCriteria([]);
    companySearch.setMatchedCompanies([]);
    documentGeneration.clearGeneratedDocuments();
    setProjectData({
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      budget: '',
      deadline: ''
    });
  };
  
  // Context value
  const contextValue = {
    // Project data
    projectData,
    updateProjectData,
    
    // Step navigation
    currentStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isStepComplete,
    
    // Company search
    ...companySearch,
    
    // File upload
    ...fileUpload,
    
    // Document generation
    ...documentGeneration,
    
    // Reset
    resetSearch
  };
  
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for using the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  
  return context;
};

export default SearchContext;