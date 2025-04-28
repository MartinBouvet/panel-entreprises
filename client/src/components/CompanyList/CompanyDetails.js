import React from 'react';
import Button from '../common/Button';

const CompanyDetails = ({ company, onClose, onSelect, isSelected = false }) => {
  if (!company) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
            {company.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{company.name}</h2>
            <p className="text-sm text-gray-500">{company.location}</p>
          </div>
        </div>
        {company.score !== undefined && (
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Score: {company.score}%
            </span>
          </div>
        )}
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Informations générales</h3>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-700">Chiffre d'affaires</dt>
              <dd className="mt-1 text-sm text-gray-900">{company.revenue || 'Non renseigné'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">Effectif</dt>
              <dd className="mt-1 text-sm text-gray-900">{company.employees || 'Non renseigné'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">Date de création</dt>
              <dd className="mt-1 text-sm text-gray-900">{company.founded || 'Non renseigné'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">Site web</dt>
              <dd className="mt-1 text-sm text-blue-600 hover:underline">
                {company.website ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    {company.website}
                  </a>
                ) : (
                  'Non renseigné'
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Qualifications</h3>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-700">Expérience</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {company.experience > 0 ? `${company.experience} projets similaires` : 'Non renseigné'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">Certifications</dt>
              <dd className="mt-1">
                {company.certifications && company.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {company.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-900">Aucune certification</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-700">Zones d'intervention</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {company.regions ? company.regions.join(', ') : 'Non renseigné'}
              </dd>
            </div>
          </dl>
        </div>

        {company.description && (
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Description</h3>
            <p className="text-sm text-gray-700">{company.description}</p>
          </div>
        )}

        {company.projects && company.projects.length > 0 && (
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Projets similaires</h3>
            <ul className="space-y-2">
              {company.projects.map((project, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {project}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-between">
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
        {onSelect && (
          <Button
            variant={isSelected ? 'success' : 'primary'}
            onClick={() => onSelect(company)}
          >
            {isSelected ? 'Désélectionner' : 'Sélectionner cette entreprise'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;