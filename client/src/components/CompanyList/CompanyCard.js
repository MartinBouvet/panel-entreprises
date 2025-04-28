import React from 'react';
import Button from '../common/Button';

const CompanyCard = ({ 
  company, 
  onViewDetails,
  onSelect,
  isSelected = false,
  showScore = true,
  className = '' 
}) => {
  return (
    <div className={`border rounded-lg overflow-hidden bg-white ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} ${className}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {company.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.location}</p>
          </div>
        </div>
        {showScore && company.score !== undefined && (
          <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Score: {company.score}%
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700">CA Annuel</h4>
          <p className="text-sm text-gray-900">{company.revenue}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700">Expérience</h4>
          <p className="text-sm text-gray-900">
            {company.experience > 0 ? `${company.experience} projets similaires` : 'Non renseigné'}
          </p>
        </div>
        
        {company.certifications && company.certifications.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700">Certifications</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {company.certifications.map((cert, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <Button
          variant="text"
          onClick={() => onViewDetails(company)}
          className="text-blue-600 hover:text-blue-900"
        >
          Voir détails
        </Button>
        
        {onSelect && (
          <Button
            variant={isSelected ? 'primary' : 'secondary'}
            onClick={() => onSelect(company)}
          >
            {isSelected ? 'Sélectionné' : 'Sélectionner'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;