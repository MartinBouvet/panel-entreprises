// frontend/src/components/Results/CompanyResults.jsx
import React, { useState } from 'react';
import CompanyCard from './CompanyCard';
import ResultActions from './ResultActions';

const CompanyResults = ({ companies }) => {
  const [selectedCompanies, setSelectedCompanies] = useState(
    companies.map(company => ({ ...company, selected: true }))
  );
  
  const handleCompanySelect = (companyId, isSelected) => {
    setSelectedCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === companyId 
          ? { ...company, selected: isSelected }
          : company
      )
    );
  };
  
  const handleAddManually = () => {
    // Could open a modal for adding a company manually
    console.log('Add company manually clicked');
  };
  
  // Sort companies by score (highest first)
  const sortedCompanies = [...selectedCompanies].sort((a, b) => b.score - a.score);
  
  return (
    <div className="company-results">
      <div className="results-header">
        <div className="results-info">
          <span className="results-count">
            {companies.length} entreprises trouvées
          </span>
        </div>
      </div>
      
      <div className="results-table">
        <div className="results-table-header">
          <div className="header-entreprise">ENTREPRISE</div>
          <div className="header-localisation">LOCALISATION</div>
          <div className="header-experience">EXPÉRIENCE</div>
          <div className="header-certifications">CERTIFICATIONS</div>
          <div className="header-score">SCORE</div>
          <div className="header-actions">ACTIONS</div>
        </div>
        
        <div className="results-table-body">
          {sortedCompanies.map((company) => (
            <CompanyCard 
              key={company.id}
              company={company}
              onSelect={(isSelected) => handleCompanySelect(company.id, isSelected)}
            />
          ))}
        </div>
      </div>
      
      <button 
        className="add-company-manually" 
        onClick={handleAddManually}
      >
        Ajouter une entreprise manuellement
      </button>
      
      <ResultActions 
        selectedCompanies={selectedCompanies.filter(c => c.selected)}
      />
    </div>
  );
};

export default CompanyResults;