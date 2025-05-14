// frontend/src/hooks/useCompanySearch.js
import { useState, useEffect } from 'react';
import iaService from '../services/iaService';
import companyService from '../services/companyService';

/**
 * Custom hook for company search functionality
 */
const useCompanySearch = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectionCriteria, setSelectionCriteria] = useState([]);
  const [attributionCriteria, setAttributionCriteria] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchedCompanies, setMatchedCompanies] = useState([]);
  const [isMatching, setIsMatching] = useState(false);
  
  /**
   * Load all companies
   */
  const loadCompanies = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await companyService.getAllCompanies();
      setCompanies(response.data || []);
      setFilteredCompanies(response.data || []);
    } catch (error) {
      setError(error.message || 'Erreur lors du chargement des entreprises');
      console.error('Error loading companies:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Search for companies based on a query
   * @param {String} query - Search query
   */
  const searchCompanies = (query) => {
    if (!query || query.trim() === '') {
      setFilteredCompanies(companies);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = companies.filter(company => {
      // Search in multiple fields
      return (
        company.name.toLowerCase().includes(lowercaseQuery) ||
        company.location.toLowerCase().includes(lowercaseQuery) ||
        (company.experience && company.experience.toLowerCase().includes(lowercaseQuery)) ||
        (company.certifications && company.certifications.some(cert => cert.toLowerCase().includes(lowercaseQuery)))
      );
    });
    
    setFilteredCompanies(filtered);
  };
  
  /**
   * Analyze document to extract criteria
   * @param {String} documentText - Document text content
   */
  const analyzeDocument = async (documentText) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const analysisResult = await iaService.analyzeDocument(documentText);
      
      if (analysisResult && analysisResult.selectionCriteria) {
        setSelectionCriteria(analysisResult.selectionCriteria);
      }
      
      if (analysisResult && analysisResult.attributionCriteria) {
        setAttributionCriteria(analysisResult.attributionCriteria);
      }
      
      return analysisResult;
    } catch (error) {
      setError(error.message || 'Erreur lors de l\'analyse du document');
      console.error('Error analyzing document:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Find companies matching criteria
   */
  const findMatchingCompanies = async () => {
    if (!companies.length || !selectionCriteria.length) {
      setError('Entreprises ou critères non disponibles');
      return;
    }
    
    setIsMatching(true);
    setError(null);
    
    try {
      // Only use selected criteria
      const selectedCriteria = selectionCriteria.filter(c => c.selected);
      
      if (selectedCriteria.length === 0) {
        setMatchedCompanies(companies);
        return;
      }
      
      const response = await iaService.findMatchingCompanies(companies, selectedCriteria);
      setMatchedCompanies(response.data || []);
    } catch (error) {
      setError(error.message || 'Erreur lors de la recherche d\'entreprises correspondantes');
      console.error('Error finding matching companies:', error);
    } finally {
      setIsMatching(false);
    }
  };
  
  /**
   * Update criteria
   * @param {Array} criteria - Updated criteria
   * @param {String} type - Type of criteria ('selection' or 'attribution')
   */
  const updateCriteria = (criteria, type) => {
    if (type === 'selection') {
      setSelectionCriteria(criteria);
    } else if (type === 'attribution') {
      setAttributionCriteria(criteria);
    }
  };
  
  /**
   * Load companies on mount
   */
  useEffect(() => {
    loadCompanies();
  }, []);
  
  return {
    companies,
    filteredCompanies,
    selectionCriteria,
    attributionCriteria,
    isLoading,
    error,
    matchedCompanies,
    isMatching,
    loadCompanies,
    searchCompanies,
    analyzeDocument,
    findMatchingCompanies,
    updateCriteria
  };
};

export default useCompanySearch;