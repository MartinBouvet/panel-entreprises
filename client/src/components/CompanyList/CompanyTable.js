import React, { useState } from 'react';
import CompanyCard from './CompanyCard';
import Button from '../common/Button';

const CompanyTable = ({
  companies = [],
  onViewDetails,
  onSelectCompany,
  selectedCompanies = [],
  maxSelections = null,
  showScore = true,
  className = ''
}) => {
  const [sortField, setSortField] = useState('score');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCompanies = [...companies]
    .filter(company => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        company.name.toLowerCase().includes(search) ||
        company.location.toLowerCase().includes(search) ||
        (company.description && company.description.toLowerCase().includes(search))
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'location') {
        comparison = a.location.localeCompare(b.location);
      } else if (sortField === 'experience') {
        comparison = (a.experience || 0) - (b.experience || 0);
      } else if (sortField === 'score') {
        comparison = (a.score || 0) - (b.score || 0);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const isCompanySelected = (companyId) => {
    return selectedCompanies.some(c => c.id === companyId);
  };

  const handleToggleSelect = (company) => {
    if (isCompanySelected(company.id)) {
      onSelectCompany(selectedCompanies.filter(c => c.id !== company.id));
    } else {
      if (maxSelections && selectedCompanies.length >= maxSelections) {
        // Si le nombre max de sélections est atteint, on retire le dernier
        const newSelection = [...selectedCompanies.slice(1), company];
        onSelectCompany(newSelection);
      } else {
        onSelectCompany([...selectedCompanies, company]);
      }
    }
  };

  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
            Liste des entreprises ({sortedCompanies.length})
          </h3>
          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une entreprise..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              {onSelectCompany && (
                <th className="px-4 py-3 w-10">
                  <span className="sr-only">Sélection</span>
                </th>
              )}
              <th 
                className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Entreprise
                  {sortField === 'name' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center">
                  Localisation
                  {sortField === 'location' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('experience')}
              >
                <div className="flex items-center">
                  Expérience
                  {sortField === 'experience' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                Certifications
              </th>
              {showScore && (
                <th 
                  className="px-4 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('score')}
                >
                  <div className="flex items-center">
                    Score
                    {sortField === 'score' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              )}
              <th className="px-4 py-3 text-right w-20">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedCompanies.length > 0 ? (
              sortedCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  {onSelectCompany && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isCompanySelected(company.id)}
                        onChange={() => handleToggleSelect(company)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {company.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">CA: {company.revenue}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{company.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {company.experience > 0 ? `${company.experience} projets similaires` : 'Non renseigné'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      {company.certifications && company.certifications.map((cert, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                  {showScore && (
                    <td className="px-4 py-3">
                      <div className="text-sm font-bold text-gray-900">
                        {company.score ? `${company.score}%` : '-'}
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-3 text-right text-sm font-medium">
                    <Button
                      variant="text"
                      onClick={() => onViewDetails(company)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Détails
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={onSelectCompany ? 7 : 6} className="px-4 py-8 text-center text-sm text-gray-500">
                  Aucune entreprise trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyTable;