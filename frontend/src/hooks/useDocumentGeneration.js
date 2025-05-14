// frontend/src/hooks/useDocumentGeneration.js
import { useState } from 'react';
import documentService from '../services/documentService';

/**
 * Custom hook for document generation functionality
 */
const useDocumentGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [generatedDocuments, setGeneratedDocuments] = useState([]);
  const [documentTemplates, setDocumentTemplates] = useState([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  
  /**
   * Load available document templates
   */
  const loadTemplates = async () => {
    setIsLoadingTemplates(true);
    setError(null);
    
    try {
      const response = await documentService.getDocumentTemplates();
      setDocumentTemplates(response.data || []);
    } catch (error) {
      setError(error.message || 'Erreur lors du chargement des modèles de documents');
      console.error('Error loading document templates:', error);
    } finally {
      setIsLoadingTemplates(false);
    }
  };
  
  /**
   * Generate a document
   * @param {String} templateType - Type of document to generate
   * @param {Object} projectData - Project data
   * @param {Array} companies - Selected companies
   * @param {String} cahierDesCharges - Document text content
   * @returns {Promise<Object|null>} - Generated document info or null if error
   */
  const generateDocument = async (templateType, projectData, companies, cahierDesCharges) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await documentService.generateDocument(
        templateType,
        projectData,
        companies,
        cahierDesCharges
      );
      
      // Add to generated documents list
      const newDocument = {
        templateType,
        ...response.data
      };
      
      setGeneratedDocuments(prevDocs => [...prevDocs, newDocument]);
      
      return response.data;
    } catch (error) {
      setError(error.message || 'Erreur lors de la génération du document');
      console.error('Error generating document:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };
  
  /**
   * Generate multiple documents
   * @param {Array<String>} templateTypes - Types of documents to generate
   * @param {Object} projectData - Project data
   * @param {Array} companies - Selected companies
   * @param {String} cahierDesCharges - Document text content
   * @returns {Promise<Array>} - List of generated documents
   */
  const generateMultipleDocuments = async (templateTypes, projectData, companies, cahierDesCharges) => {
    setIsGenerating(true);
    setError(null);
    
    const results = [];
    
    try {
      for (const templateType of templateTypes) {
        try {
          const result = await generateDocument(templateType, projectData, companies, cahierDesCharges);
          if (result) {
            results.push({
              templateType,
              ...result
            });
          }
        } catch (error) {
          console.error(`Error generating ${templateType} document:`, error);
          // Continue with other documents even if one fails
        }
      }
      
      return results;
    } catch (error) {
      setError(error.message || 'Erreur lors de la génération des documents');
      console.error('Error generating multiple documents:', error);
      return results;
    } finally {
      setIsGenerating(false);
    }
  };
  
  /**
   * Get download URL for a document
   * @param {String} fileName - Name of the document file
   * @returns {String} - Download URL
   */
  const getDocumentDownloadUrl = (fileName) => {
    return documentService.getDocumentDownloadUrl(fileName);
  };
  
  /**
   * Clear generated documents list
   */
  const clearGeneratedDocuments = () => {
    setGeneratedDocuments([]);
  };
  
  return {
    isGenerating,
    error,
    generatedDocuments,
    documentTemplates,
    isLoadingTemplates,
    loadTemplates,
    generateDocument,
    generateMultipleDocuments,
    getDocumentDownloadUrl,
    clearGeneratedDocuments
  };
};

export default useDocumentGeneration;