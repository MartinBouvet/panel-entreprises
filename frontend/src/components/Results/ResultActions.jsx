// frontend/src/components/Results/ResultActions.jsx
import React from 'react';
import { FileText, Download, Share2 } from 'lucide-react';

const ResultActions = ({ selectedCompanies }) => {
  const handleGenerateDocuments = () => {
    console.log('Generate documents for companies:', selectedCompanies);
    // Navigate to document generation step or open modal
  };
  
  const handleExportResults = () => {
    console.log('Export results for companies:', selectedCompanies);
    // Generate and download an Excel/PDF file
  };
  
  const handleShareResults = () => {
    console.log('Share results for companies:', selectedCompanies);
    // Open sharing options modal
  };
  
  return (
    <div className="result-actions">
      <div className="selected-info">
        <span className="selected-count">
          {selectedCompanies.length} entreprises sélectionnées
        </span>
      </div>
      
      <div className="action-buttons">
        <button 
          className="generate-documents-btn primary-button" 
          onClick={handleGenerateDocuments}
          disabled={selectedCompanies.length === 0}
        >
          <FileText size={18} />
          Générer les documents
        </button>
        
        <button 
          className="export-results-btn secondary-button" 
          onClick={handleExportResults}
          disabled={selectedCompanies.length === 0}
        >
          <Download size={18} />
          Exporter les résultats
        </button>
        
        <button 
          className="share-results-btn secondary-button" 
          onClick={handleShareResults}
          disabled={selectedCompanies.length === 0}
        >
          <Share2 size={18} />
          Partager
        </button>
      </div>
    </div>
  );
};

export default ResultActions;